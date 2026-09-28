import { TERMS, TERMS_ENTITY } from "@/lib/terms-content";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = TERMS[locale] ?? TERMS.en;

  return (
    <div className="container max-w-3xl py-12">
      <h1 className="mb-2 text-3xl font-bold text-ink-900">{content.title}</h1>
      <p className="mb-10 text-sm text-ink-400">{content.updated}</p>

      <div className="space-y-10 text-sm leading-relaxed text-ink-700 sm:text-base">
        {content.sections.map((section, index) => {
          const isContact = index === content.sections.length - 1;
          return (
            <Section key={index} title={section.title}>
              {section.paragraphs.map((p, i) => (
                <p key={i}>{renderBold(p)}</p>
              ))}
              {isContact && (
                <div className="rounded-2xl bg-mist-50 p-5">
                  <p className="font-semibold text-ink-900">{TERMS_ENTITY.name}</p>
                  <p>
                    {content.businessIdLabel}: {TERMS_ENTITY.businessId}
                  </p>
                  <p>
                    {content.addressLabel}: {TERMS_ENTITY.address}
                  </p>
                  <p>Email: {TERMS_ENTITY.email}</p>
                </div>
              )}
            </Section>
          );
        })}
      </div>
    </div>
  );
}

/** Turns `**text**` into <strong>text</strong>. */
function renderBold(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-bold text-ink-900">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
