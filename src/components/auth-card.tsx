export function AuthCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-mist-50 px-4 py-12">
      <div className="card w-full max-w-md p-8">
        <h1 className="mb-6 text-center text-xl font-bold text-ink-900">{title}</h1>
        {children}
      </div>
    </div>
  );
}
