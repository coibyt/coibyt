import { NextResponse } from "next/server";
import { requireSectionBusinessId, requireApprovedOwnedBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations";
import { MAX_PRODUCT_IMAGE_BYTES, ALLOWED_PRODUCT_IMAGE_TYPES, MAX_PRODUCT_IMAGES } from "@/lib/product-images";

export async function GET() {
  const businessId = await requireSectionBusinessId("products");
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const products = await prisma.product.findMany({
    where: { businessId },
    include: {
      images: { select: { id: true }, orderBy: { sortOrder: "asc" } },
      _count: { select: { reviews: true } },
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json({
    products: products.map((p) => ({
      ...p,
      imageIds: p.images.map((i) => i.id),
      reviewCount: p._count.reviews,
    })),
  });
}

export async function POST(req: Request) {
  const result = await requireApprovedOwnedBusinessId();
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.error === "FORBIDDEN" ? 403 : 409 });
  }
  const { businessId } = result;

  const form = await req.formData();
  const fields = {
    name: form.get("name"),
    brand: form.get("brand") || undefined,
    description: form.get("description") || undefined,
    groupId: form.get("groupId") || null,
    priceCents: form.get("priceCents"),
    compareAtCents: form.get("compareAtCents") || null,
    currency: form.get("currency") || "VND",
    videoUrl: form.get("videoUrl") || undefined,
    featured: form.get("featured") === "true",
    soldOut: form.get("soldOut") === "true",
    hidden: form.get("hidden") === "true",
  };
  const parsed = productSchema.safeParse(fields);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { groupId, videoUrl, brand, compareAtCents, ...data } = parsed.data;

  if (groupId) {
    const group = await prisma.productGroup.findFirst({ where: { id: groupId, businessId } });
    if (!group) return NextResponse.json({ error: "INVALID_GROUP" }, { status: 400 });
  }

  const images = form.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  if (images.length > MAX_PRODUCT_IMAGES) {
    return NextResponse.json({ error: "TOO_MANY_IMAGES" }, { status: 400 });
  }
  for (const img of images) {
    if (img.size > MAX_PRODUCT_IMAGE_BYTES) {
      return NextResponse.json({ error: "FILE_TOO_LARGE" }, { status: 400 });
    }
    if (!ALLOWED_PRODUCT_IMAGE_TYPES.has(img.type)) {
      return NextResponse.json({ error: "UNSUPPORTED_TYPE" }, { status: 400 });
    }
  }
  const imageRows = await Promise.all(
    images.map(async (img, index) => ({
      imageData: Buffer.from(await img.arrayBuffer()),
      imageMimeType: img.type,
      sortOrder: index,
    }))
  );

  // New products go to the top of the shop.
  const first = await prisma.product.aggregate({ where: { businessId }, _min: { sortOrder: true } });

  const product = await prisma.product.create({
    data: {
      ...data,
      brand: brand?.trim() || null,
      // A "regular price" at or below the selling price isn't a sale.
      compareAtCents: compareAtCents && compareAtCents > data.priceCents ? compareAtCents : null,
      sortOrder: (first._min.sortOrder ?? 1) - 1,
      groupId: groupId || null,
      videoUrl: videoUrl || null,
      businessId,
      images: { create: imageRows },
    },
    include: { images: { select: { id: true }, orderBy: { sortOrder: "asc" } } },
  });

  return NextResponse.json(
    { product: { ...product, imageIds: product.images.map((i) => i.id), reviewCount: 0 } },
    { status: 201 }
  );
}
