import { NextResponse } from "next/server";
import { requireOwnerOrReadOnlyViewer } from "@/lib/current-business";
import { getMarketingRecipients } from "@/lib/marketing-recipients";
import { AUDIENCE_GROUPS, campaignAudience } from "@/lib/marketing-audience";

/** One sent campaign's recipients by what they did — opened, clicked, didn't
 * open, unsubscribed — and, for a follow-up to each group, how many can be
 * emailed now and how many only by skipping the 72h rest. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const owned = await requireOwnerOrReadOnlyViewer();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const { id } = await params;
  const [audience, all] = await Promise.all([campaignAudience(owned.businessId, id), getMarketingRecipients(owned.businessId, "ALL")]);
  if (!audience) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const key = (c: { id: string; kind: string }) => `${c.kind}:${c.id}`;
  const eligible = new Set(all.eligible.map(key));
  const cooldown = new Set(all.cooldown.map(key));

  return NextResponse.json({
    tracked: audience.tracked,
    groups: Object.fromEntries(
      AUDIENCE_GROUPS.map((g) => {
        const people = audience.groups[g];
        return [
          g,
          {
            count: people.length,
            // Read-only viewers see who, not their addresses.
            people: people.slice(0, 500).map((p) => ({ name: p.name, email: owned.isOwner ? p.email : null })),
            eligible: people.filter((p) => eligible.has(p.key)).length,
            cooldown: people.filter((p) => cooldown.has(p.key)).length,
          },
        ];
      }),
    ),
  });
}
