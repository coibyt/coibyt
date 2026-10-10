import { NextResponse } from "next/server";
import { requireSectionBusinessId, requireApprovedOwnedBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations";
import { MAX_PRODUCT_IMAGE_BYTES, ALLOWED_PRODUCT_IMAGE_TYPES, MAX_PRODUCT_IMAGES } from "@/lib/product-images";

async function assertOwnership(businessId: string, productId: string) {
  return prisma.product.findFirst({ where: { id: productId, businessId }, include: { images: true } });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const result = await requireApprovedOwnedBusinessId();
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.error === "FORBIDDEN" ? 403 : 409 });
  }
  const { businessId } = result;
  const existing = await assertOwnership(businessId, id);
  if (!existing) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const form = await req.formData();
  const fields: Record<string, unknown> = {};
  if (form.has("name")) fields.name = form.get("name");
  if (form.has("description")) fields.description = form.get("description") || undefined;
  if (form.has("groupId")) fields.groupId = form.get("groupId") || null;
  if (form.has("priceCents")) fields.priceCents = form.get("priceCents");
  if (form.has("currency")) fields.currency = form.get("currency");
  if (form.has("videoUrl")) fields.videoUrl = form.get("videoUrl") || undefined;

  const parsed = productSchema.partial().safeParse(fields);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { groupId, videoUrl, ...data } = parsed.data;

  if (groupId) {
    const group = await prisma.productGroup.findFirst({ where: { id: groupId, businessId } });
    if (!group) return NextResponse.json({ error: "INVALID_GROUP" }, { status: 400 });
  }

  const removeImageIds = form.getAll("removeImageIds").filter((v): v is string => typeof v === "string");
  const newImages = form.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  const remainingCount = existing.images.length - removeImageIds.length;
  if (remainingCount + newImages.length > MAX_PRODUCT_IMAGES) {
    return NextResponse.json({ error: "TOO_MANY_IMAGES" }, { status: 400 });
  }
  for (const img of newImages) {
    if (img.size > MAX_PRODUCT_IMAGE_BYTES) {
      return NextResponse.json({ error: "FILE_TOO_LARGE" }, { status: 400 });
    }
    if (!ALLOWED_PRODUCT_IMAGE_TYPES.has(img.type)) {
      return NextResponse.json({ error: "UNSUPPORTED_TYPE" }, { status: 400 });
    }
  }
  const maxSortOrder = existing.images.reduce((m, i) => Math.max(m, i.sortOrder), -1);
  const newImageRows = await Promise.all(
    newImages.map(async (img, index) => ({
      imageData: Buffer.from(await img.arrayBuffer()),
      imageMimeType: img.type,
      sortOrder: maxSortOrder + 1 + index,
    }))
  );

  const product = await prisma.$transaction(async (tx) => {
    if (removeImageIds.length > 0) {
      await tx.productImage.deleteMany({ where: { id: { in: removeImageIds }, productId: id } });
    }
    return tx.product.update({
      where: { id },
      data: {
        ...data,
        ...(groupId !== undefined ? { groupId: groupId || null } : {}),
        ...(videoUrl !== undefined ? { videoUrl: videoUrl || null } : {}),
        images: newImageRows.length > 0 ? { create: newImageRows } : undefined,
      },
      include: { images: { select: { id: true }, orderBy: { sortOrder: "asc" } } },
    });
  });

  return NextResponse.json({ product: { ...product, imageIds: product.images.map((i) => i.id) } });
}

/** Soft-delete only — a product may already be referenced by past
 * OrderItems, same discipline as Service (never hard-deleted). */
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const businessId = await requireSectionBusinessId("products");
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const existing = await prisma.product.findFirst({ where: { id, businessId } });
  if (!existing) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  await prisma.product.update({ where: { id }, data: { active: false } });
  return NextResponse.json({ ok: true });
}
