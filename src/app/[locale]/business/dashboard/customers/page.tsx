import { customerScopeBusinessIds, getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { redirect } from "@/i18n/navigation";
import { CustomersManager, type CustomerRow } from "@/components/customers-manager";
import { siteSerif } from "@/lib/site-fonts";

export default async function BusinessCustomersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const access = await getBusinessAccess();
  if (!access) return null;
  if (!access.isOwner && !access.permissions.customers) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const scopeIds = await customerScopeBusinessIds(access);
  const [bookings, notes] = await Promise.all([
    prisma.booking.findMany({
      where: { businessId: { in: scopeIds } },
      select: {
        startsAt: true,
        priceCents: true,
        currency: true,
        status: true,
        customer: { select: { id: true, name: true, email: true, phone: true } },
      },
      orderBy: { startsAt: "desc" },
    }),
    prisma.customerNote.findMany({ where: { businessId: access.business.id }, select: { customerId: true } }),
  ]);
  const withNote = new Set(notes.map((n) => n.customerId));
  // Staff only see phone numbers and emails when they're allowed to.
  const showContact = access.canViewCustomerContactInfo;

  const now = Date.now();
  const byCustomer = new Map<string, CustomerRow>();
  for (const b of bookings) {
    let c = byCustomer.get(b.customer.id);
    if (!c) {
      c = {
        id: b.customer.id,
        name: b.customer.name,
        email: showContact ? b.customer.email : null,
        phone: showContact ? b.customer.phone : null,
        walkIn: b.customer.email.endsWith("@walkin.varaaai.com"),
        visits: 0,
        bookings: 0,
        noShows: 0,
        spentCents: 0,
        currency: b.currency,
        firstVisit: null,
        lastVisit: null,
        nextVisit: null,
        hasNote: withNote.has(b.customer.id),
      };
      byCustomer.set(b.customer.id, c);
    }
    c.bookings++;
    const t = b.startsAt.getTime();
    const iso = b.startsAt.toISOString();
    if (b.status === "NO_SHOW") c.noShows++;
    if (b.status === "COMPLETED") {
      c.visits++;
      c.spentCents += b.priceCents;
    }
    const happened = (b.status === "COMPLETED" || b.status === "CONFIRMED") && t <= now;
    if (happened) {
      if (!c.lastVisit || iso > c.lastVisit) c.lastVisit = iso;
      if (!c.firstVisit || iso < c.firstVisit) c.firstVisit = iso;
    }
    if ((b.status === "CONFIRMED" || b.status === "PENDING_PAYMENT") && t > now && (!c.nextVisit || iso < c.nextVisit)) {
      c.nextVisit = iso;
    }
  }

  const customers = Array.from(byCustomer.values()).sort((a, b) =>
    (b.lastVisit ?? b.nextVisit ?? "").localeCompare(a.lastVisit ?? a.nextVisit ?? "")
  );

  return (
    <div className={siteSerif.variable}>
      <CustomersManager
        customers={customers}
        locale={locale}
        currentBusinessId={access.business.id}
        canManageBookings={access.isOwner || access.permissions.bookings}
        canEmail={access.isOwner}
      />
    </div>
  );
}
