import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    // No assumed country code — this platform serves customers signing up
    // from many different countries, so the field just takes whatever
    // format they naturally type (ideally with their own "+CC" prefix).
    phone: z.string().min(6).max(30),
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
  // Populated when the owner picks an address-autocomplete suggestion —
  // absent if they just typed free text without selecting one.
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
  // Drives the salon's timezone (see timezoneForCountry in src/lib/countries.ts)
  // — required so every new business has a real timezone from day one.
  country: z.string().length(2),
});

// Used when someone applies to list a business while signed out — the same
// application fields as businessApplicationSchema, plus the account details
// needed to create their user row in the same request (see
// /api/business/apply). That new account is both the business owner AND,
// once email-verified, an ordinary customer account.
export const businessApplicationWithAccountSchema = businessApplicationSchema.extend({
  ownerName: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(72),
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
  videoUrl: z.string().url().max(300).optional().or(z.literal("")),
  staffAssignments: z
    .array(
      z.object({
        staffId: z.string().cuid(),
        priceCentsOverride: z.number().int().min(0).optional(),
        durationMinOverride: z.number().int().min(5).optional(),
      })
    )
    .optional(),
});

export const serviceAddOnSchema = z.object({
  name: z.string().min(2).max(120),
  priceCents: z.coerce.number().int().min(0),
  durationMin: z.coerce.number().int().min(0).max(300).default(0),
});

export const serviceAddOnLinksSchema = z.array(z.string().cuid());

export const staffSchema = z.object({
  name: z.string().min(2).max(120),
  title: z.string().max(120).optional(),
  bio: z.string().max(2000).optional(),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  serviceIds: z.array(z.string().cuid()).optional(),
  // A login is optional — leaving both blank keeps the staff member as a
  // schedulable name with no dashboard access of their own.
  email: z.string().email().max(180).optional().or(z.literal("")),
  password: z.string().min(8).max(72).optional().or(z.literal("")),
  canViewServices: z.boolean().optional(),
  canViewBookings: z.boolean().optional(),
  canViewCustomers: z.boolean().optional(),
  canViewHours: z.boolean().optional(),
  canViewReviews: z.boolean().optional(),
  canViewCustomerContactInfo: z.boolean().optional(),
  // Minutes of advance notice customers must give to book this staff member.
  leadTimeMinutes: z.coerce.number().int().min(0).max(1440).optional(),
  staffMessage: z.string().max(2000).optional().or(z.literal("")),
  videoUrls: z.array(z.string().url().max(300).or(z.literal(""))).max(5).optional(),
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
  paymentProvider: z.enum(["CASH", "BANK_TRANSFER", "STRIPE"]),
  addOnIds: z.array(z.string().cuid()).max(20).optional(),
  extraServiceIds: z.array(z.string().cuid()).max(10).optional(),
});

export const reviewSchema = z.object({
  bookingId: z.string().cuid(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(2000).optional(),
});
