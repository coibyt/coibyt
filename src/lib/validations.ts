import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(8).max(72),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "PASSWORD_MISMATCH",
    path: ["confirmPassword"],
  });

export const businessApplicationSchema = z.object({
  name: z.string().min(2).max(120),
  description: z.string().max(2000).optional(),
  categoryId: z.string().cuid(),
  addressLine: z.string().min(3).max(200),
  city: z.string().min(2).max(100),
  phone: z.string().min(6).max(20),
});

export const serviceSchema = z.object({
  name: z.string().min(2).max(120),
  description: z.string().max(2000).optional(),
  categoryId: z.string().cuid().optional(),
  durationMin: z.coerce.number().int().min(5).max(600),
  bufferMin: z.coerce.number().int().min(0).max(180).default(0),
  priceCents: z.coerce.number().int().min(0),
  depositCents: z.coerce.number().int().min(0).optional(),
  currency: z.enum(["VND", "USD", "EUR"]).default("VND"),
  staffIds: z.array(z.string().cuid()).optional(),
});

export const staffSchema = z.object({
  name: z.string().min(2).max(120),
  title: z.string().max(120).optional(),
  bio: z.string().max(2000).optional(),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  serviceIds: z.array(z.string().cuid()).optional(),
});

export const businessHoursSchema = z.array(
  z.object({
    weekday: z.number().int().min(0).max(6),
    openMinute: z.number().int().min(0).max(1439),
    closeMinute: z.number().int().min(0).max(1440),
  })
);

export const createBookingSchema = z.object({
  serviceId: z.string().cuid(),
  staffId: z.string().cuid().optional(),
  startsAt: z.string().datetime(),
  customerNote: z.string().max(1000).optional(),
  paymentProvider: z.enum(["STRIPE", "VNPAY", "MOMO"]),
});

export const reviewSchema = z.object({
  bookingId: z.string().cuid(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(2000).optional(),
});
