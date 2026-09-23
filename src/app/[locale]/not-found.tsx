import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-extrabold text-ink-900">404</h1>
      <p className="text-ink-400">Trang bạn tìm không tồn tại.</p>
      <Link href="/" className="btn-primary">
        Về trang chủ
      </Link>
    </div>
  );
}
