/** Shown at the top of a dashboard page a "view all pages, read-only" staff
 * member can now reach (see requireOwnerOrReadOnlyViewer) — the page's own
 * save/send/delete buttons still work the same as before and will just
 * 403 for this viewer, so this sets the expectation up front instead of
 * letting them find out by a failed click. */
export function ReadOnlyBanner({ locale }: { locale: string }) {
  return (
    <div className="mb-4 rounded-xl bg-mist-50 px-4 py-2.5 text-sm text-ink-700">
      {locale === "vi"
        ? "Bạn chỉ có quyền xem trang này — không thể lưu hoặc thay đổi gì."
        : "You have view-only access to this page — you can't save or change anything here."}
    </div>
  );
}
