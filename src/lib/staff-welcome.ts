import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { SITE_URL } from "@/lib/email/ui";
import { staffWelcomeEmail, type StaffFeature } from "@/lib/email/staff-welcome-email";

/** A welcome link to set one's own password stays valid this long. */
const SET_PASSWORD_TTL_MS = 7 * 24 * 60 * 60 * 1000;

/** Emails a staff member who has just been given a login: how to sign in,
 * a link to set their own password, and a guide to the parts of the
 * dashboard their permissions open. In the owner's language. Never throws —
 * saving the staff member must not fail over an email. */
export async function sendStaffWelcomeEmail(staffId: string) {
  try {
    const staff = await prisma.staff.findUnique({
      where: { id: staffId },
      include: {
        user: { select: { id: true, email: true } },
        business: { select: { name: true, logoUrl: true, city: true, owner: { select: { name: true, locale: true } } } },
      },
    });
    if (!staff?.user) return false;

    const viewAll = staff.canViewAllPagesReadOnly;
    const can = (flag: boolean) => viewAll || flag;
    const features: StaffFeature[] = [
      ...(can(staff.canViewBookings) ? (["bookings"] as const) : []),
      "income",
      ...(can(staff.canViewBookings) ? (["loyalty"] as const) : []),
      ...(can(staff.canViewCustomers) ? (["customers"] as const) : []),
      ...(can(staff.canViewServices) ? (["services"] as const) : []),
      ...(can(staff.canViewProducts) ? (["products"] as const) : []),
      ...(can(staff.canViewHours) ? (["hours"] as const) : []),
      ...(can(staff.canViewReviews) ? (["reviews"] as const) : []),
      ...(viewAll ? (["viewAll"] as const) : []),
      "team",
    ];

    // A link to choose their own password (the owner set the first one).
    const token = randomBytes(32).toString("hex");
    await prisma.passwordResetToken.deleteMany({ where: { userId: staff.user.id } });
    await prisma.passwordResetToken.create({
      data: { userId: staff.user.id, token, expires: new Date(Date.now() + SET_PASSWORD_TTL_MS) },
    });

    const locale = staff.business.owner.locale || "vi";
    const mail = staffWelcomeEmail({
      locale,
      staffName: staff.name,
      loginEmail: staff.user.email,
      ownerName: staff.business.owner.name,
      salon: { name: staff.business.name, logoUrl: staff.business.logoUrl, city: staff.business.city },
      features,
      canViewAllBookings: can(staff.canViewBookings) && staff.canViewAllBookings,
      canViewContactInfo: can(staff.canViewBookings) && staff.canViewCustomerContactInfo,
      setPasswordUrl: `${SITE_URL}/${locale}/auth/reset-password?token=${token}`,
    });
    await sendMail({ to: staff.user.email, subject: mail.subject, html: mail.html });
    return true;
  } catch (err) {
    console.error("[staff-welcome]", staffId, err);
    return false;
  }
}
