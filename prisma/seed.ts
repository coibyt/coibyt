import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding VaraaAi.Com...");

  const passwordHash = await bcrypt.hash("Password123!", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@varaaai.com" },
    update: {},
    create: {
      name: "VaraaAi Admin",
      email: "admin@varaaai.com",
      password: passwordHash,
      role: "ADMIN",
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: "customer@varaaai.com" },
    update: {},
    create: {
      name: "Nguyễn Thị Khách Hàng",
      email: "customer@varaaai.com",
      password: passwordHash,
      role: "CUSTOMER",
    },
  });

  const categoriesData = [
    { slug: "hair-salon", nameVi: "Cắt tóc & tạo kiểu", nameEn: "Hair salon", icon: "Scissors" },
    { slug: "spa-massage", nameVi: "Spa & massage", nameEn: "Spa & massage", icon: "Sparkles" },
    { slug: "nails", nameVi: "Nail & móng", nameEn: "Nails", icon: "Hand" },
    { slug: "skincare", nameVi: "Chăm sóc da mặt", nameEn: "Skincare & facials", icon: "Smile" },
    { slug: "barber", nameVi: "Cắt tóc nam", nameEn: "Barber", icon: "Scissors" },
    { slug: "makeup", nameVi: "Trang điểm", nameEn: "Makeup", icon: "Palette" },
    { slug: "eyebrows-lashes", nameVi: "Mi & chân mày", nameEn: "Brows & lashes", icon: "Eye" },
    { slug: "wellness", nameVi: "Sức khoẻ & thư giãn", nameEn: "Wellness", icon: "HeartHandshake" },
  ];

  const categories = await Promise.all(
    categoriesData.map((c) =>
      prisma.category.upsert({ where: { slug: c.slug }, update: {}, create: c })
    )
  );

  const catBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));

  const ownerAccounts = await Promise.all(
    ["owner1@varaaai.com", "owner2@varaaai.com", "owner3@varaaai.com"].map((email, i) =>
      prisma.user.upsert({
        where: { email },
        update: {},
        create: {
          name: `Chủ salon ${i + 1}`,
          email,
          password: passwordHash,
          role: "BUSINESS_OWNER",
        },
      })
    )
  );

  const businessesData = [
    {
      owner: ownerAccounts[0],
      slug: "luna-hair-hanoi",
      name: "Luna Hair Studio",
      description: "Salon tóc cao cấp tại trung tâm Hà Nội, chuyên cắt & nhuộm màu thời trang.",
      category: "hair-salon",
      city: "Hà Nội",
      address: "12 Phố Huế, Hai Bà Trưng",
      services: [
        { name: "Cắt tóc nữ", durationMin: 45, priceCents: 250_000 },
        { name: "Nhuộm màu thời trang", durationMin: 120, priceCents: 900_000, depositCents: 200_000 },
        { name: "Uốn/duỗi", durationMin: 150, priceCents: 1_200_000, depositCents: 300_000 },
      ],
      staff: ["Chị Mai", "Chị Linh"],
    },
    {
      owner: ownerAccounts[1],
      slug: "zen-spa-saigon",
      name: "Zen Spa & Wellness",
      description: "Không gian thư giãn giữa lòng Sài Gòn với liệu trình massage & chăm sóc da chuẩn Hàn.",
      category: "spa-massage",
      city: "TP. Hồ Chí Minh",
      address: "88 Nguyễn Huệ, Quận 1",
      services: [
        { name: "Massage body 60 phút", durationMin: 60, priceCents: 450_000 },
        { name: "Massage đá nóng", durationMin: 90, priceCents: 650_000 },
        { name: "Chăm sóc da mặt chuyên sâu", durationMin: 75, priceCents: 550_000 },
      ],
      staff: ["Kỹ thuật viên Hoa", "Kỹ thuật viên An"],
    },
    {
      owner: ownerAccounts[2],
      slug: "bloom-nails-danang",
      name: "Bloom Nails & Beauty",
      description: "Tiệm nail phong cách Nhật, tỉ mỉ từng chi tiết tại Đà Nẵng.",
      category: "nails",
      city: "Đà Nẵng",
      address: "45 Trần Phú",
      services: [
        { name: "Sơn gel", durationMin: 45, priceCents: 180_000 },
        { name: "Nối mi cổ điển", durationMin: 90, priceCents: 350_000 },
        { name: "Nail art thiết kế", durationMin: 60, priceCents: 280_000 },
      ],
      staff: ["Bạn Trang"],
    },
  ];

  for (const b of businessesData) {
    const business = await prisma.business.upsert({
      where: { slug: b.slug },
      update: {},
      create: {
        ownerId: b.owner.id,
        slug: b.slug,
        name: b.name,
        description: b.description,
        city: b.city,
        addressLine: b.address,
        phone: "0900000000",
        status: "APPROVED",
        approvedAt: new Date(),
        categories: { create: [{ categoryId: catBySlug[b.category].id }] },
        hours: {
          create: [1, 2, 3, 4, 5, 6].map((weekday) => ({
            weekday,
            openMinute: 9 * 60,
            closeMinute: 19 * 60,
          })),
        },
      },
    });

    const staffRecords = await Promise.all(
      b.staff.map((name) =>
        prisma.staff.create({ data: { businessId: business.id, name } })
      )
    );

    for (const s of b.services) {
      const service = await prisma.service.create({
        data: {
          businessId: business.id,
          categoryId: catBySlug[b.category].id,
          name: s.name,
          durationMin: s.durationMin,
          priceCents: s.priceCents,
          depositCents: "depositCents" in s ? s.depositCents : undefined,
          currency: "VND",
        },
      });
      await prisma.staffService.createMany({
        data: staffRecords.map((st) => ({ staffId: st.id, serviceId: service.id })),
      });
    }
  }

  console.log("Seed complete.");
  console.log("Admin login:    admin@varaaai.com / Password123!");
  console.log("Customer login: customer@varaaai.com / Password123!");
  console.log("Owner logins:   owner1@varaaai.com, owner2@varaaai.com, owner3@varaaai.com / Password123!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
