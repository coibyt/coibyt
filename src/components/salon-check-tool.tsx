"use client";

import { useState } from "react";
import {
  Loader2,
  Check,
  X,
  HelpCircle,
  ChevronDown,
  Globe,
  MapPin,
  Facebook,
  Instagram,
  Sparkles,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { googleMapsSearchUrl } from "@/lib/salon-check";

type GoogleStatus = "yes" | "no" | "unsure";
type SocialStatus = "ok" | "unreachable" | "unverified" | "missing";

interface WebsiteResult {
  provided: boolean;
  reachable: boolean;
  https: boolean;
  mobileFriendly: boolean;
  hasOpenGraph: boolean;
  hasBookingLink: boolean;
  hasPricing: boolean;
  hasHours: boolean;
  hasContact: boolean;
  score: number;
}

interface SalonCheckResult {
  name: string;
  address: string;
  overallScore: number;
  website: WebsiteResult;
  google: { status: GoogleStatus; score: number };
  facebook: { url: string | null; status: SocialStatus; score: number };
  instagram: { url: string | null; status: SocialStatus; score: number };
}

interface Opportunity {
  id: string;
  severity: "high" | "medium" | "low";
  text: string;
  suggestion: string;
}

const STRINGS = {
  vi: {
    badge: "MIỄN PHÍ & NGAY LẬP TỨC",
    title: "Salon của bạn trông thế nào trên mạng?",
    subtitle:
      "Cho chúng tôi biết tên salon và địa chỉ. Chúng tôi sẽ kiểm tra trang web và mạng xã hội của bạn — miễn phí, không cần đăng ký.",
    formNameLabel: "Tên salon",
    formAddressLabel: "Địa chỉ salon",
    formWebsiteLabel: "Trang web · không bắt buộc",
    formFacebookLabel: "Link Facebook · không bắt buộc",
    formInstagramLabel: "Link Instagram · không bắt buộc",
    formGoogleQuestion: "Salon của bạn đã có hồ sơ Google doanh nghiệp chưa?",
    formGoogleYes: "Đã có",
    formGoogleNo: "Chưa có",
    formGoogleUnsure: "Không chắc",
    submitButton: "Kiểm tra miễn phí ngay",
    noSignupNote: "Không cần email, không cần đăng ký. Kết quả hiện ngay tại đây.",
    checkingTitle: "Đang kiểm tra salon của bạn",
    checkingSubtitle: "Chỉ mất vài giây thôi.",
    stepWebsite: "Trang web",
    stepGoogle: "Hồ sơ doanh nghiệp Google",
    stepFacebook: "Trang Facebook",
    stepInstagram: "Trang Instagram",
    stepSummarizing: "Đang tổng hợp kết quả",
    scorePrefix: "Điểm hiện diện trực tuyến của bạn",
    bandExcellent: "XUẤT SẮC",
    bandGood: "TỐT — VẪN CÒN DƯ ĐỊA",
    bandNeedsWork: "CẦN CẢI THIỆN",
    bandUrgent: "CẦN HÀNH ĐỘNG NGAY",
    channelWebsite: "Trang web",
    channelGoogle: "Hồ sơ Google",
    channelFacebook: "Facebook",
    channelInstagram: "Instagram",
    strongLabel: "MẠNH",
    okLabel: "KHÁ",
    weakLabel: "YẾU",
    viewDetails: "Xem chi tiết",
    hideDetails: "Thu gọn",
    goodThings: "Điều đang tốt",
    needsWork: "Cần cải thiện",
    opportunitiesTitle: "Cơ hội lớn nhất của bạn",
    opportunitiesSubtitle: "Những điểm ảnh hưởng nhiều nhất đến việc khách có chọn salon của bạn hay không.",
    impactHigh: "TÁC ĐỘNG CAO",
    impactMedium: "TÁC ĐỘNG TRUNG BÌNH",
    impactLow: "TÁC ĐỘNG THẤP",
    whatToDo: "NÊN LÀM GÌ",
    actionPlanTitle: "Kế hoạch hành động",
    actionPlanSubtitle: "Tất cả các việc nên làm, theo thứ tự ưu tiên.",
    allGoodTitle: "Mọi thứ đều ổn!",
    allGoodBody: "Chúng tôi không thấy vấn đề lớn nào — salon của bạn đang hiện diện khá tốt trên mạng.",
    viewOnGoogleMaps: "Tìm trên Google Maps",
    disclaimerGoogle: "(Dựa trên thông tin bạn cung cấp — chúng tôi chưa tự động xác minh số sao/đánh giá thật.)",
    disclaimerSocial: "(Chúng tôi chỉ kiểm tra link có hoạt động không — không đọc số liệu tương tác thật.)",
    ctaTitle: "Chưa có trang đặt lịch online?",
    ctaSubtitle:
      "VaraaAi.Com cho bạn một trang salon + đặt lịch online chuyên nghiệp, hoàn toàn miễn phí — sẵn sàng trong 5 phút, không cần biết lập trình.",
    ctaButton: "Tạo trang salon miễn phí",
    checkAnotherButton: "Kiểm tra salon khác",
    checks: {
      websiteMissing: {
        status: "Salon của bạn chưa có website.",
        suggestion: "Tạo trang hồ sơ + đặt lịch miễn phí trên VaraaAi — không cần biết lập trình.",
      },
      websiteUnreachable: {
        status: "Chúng tôi không truy cập được website bạn cung cấp — có thể đang lỗi hoặc đã ngừng hoạt động.",
        suggestion: "Kiểm tra lại website của bạn còn hoạt động không, hoặc tạo trang mới miễn phí trên VaraaAi.",
      },
      https: {
        pass: "Trang web dùng HTTPS, an toàn cho khách truy cập.",
        fail: "Trang web chưa dùng HTTPS.",
        suggestion: "Bật chứng chỉ SSL/HTTPS cho website — hầu hết nhà cung cấp hosting đều hỗ trợ miễn phí.",
      },
      mobile: {
        pass: "Trang web đã tối ưu cho điện thoại.",
        fail: "Trang web có thể chưa hiển thị tốt trên điện thoại.",
        suggestion: "Đảm bảo trang web có bố cục responsive cho điện thoại — phần lớn khách xem trên di động.",
      },
      og: {
        pass: "Khi chia sẻ link, bài chia sẻ sẽ hiện ảnh và mô tả đầy đủ.",
        fail: "Khi ai đó chia sẻ link website của bạn, bài chia sẻ có thể hiện trống trơn.",
        suggestion: "Thêm thẻ Open Graph (og:title, og:image, og:description) vào trang web.",
      },
      booking: {
        pass: "Trang web có đề cập đến việc đặt lịch.",
        fail: "Chúng tôi không thấy nút hoặc link đặt lịch rõ ràng trên trang web.",
        suggestion: "Thêm nút “Đặt lịch ngay” nổi bật trên trang chủ — hoặc dùng trang đặt lịch miễn phí của VaraaAi.",
      },
      pricing: {
        pass: "Trang web có hiển thị giá dịch vụ.",
        fail: "Chúng tôi không thấy bảng giá trên trang web.",
        suggestion: "Hiển thị giá (hoặc giá khởi điểm) cho các dịch vụ chính — khách thường bỏ qua salon không ghi giá.",
      },
      hours: {
        pass: "Trang web có ghi giờ mở cửa.",
        fail: "Chúng tôi không thấy giờ mở cửa trên trang web.",
        suggestion: "Thêm giờ mở cửa từng ngày lên trang chủ — nhiều khách bỏ đi vì không biết bạn còn mở hay không.",
      },
      contact: {
        pass: "Thông tin liên hệ dễ tìm trên trang web.",
        fail: "Chúng tôi không tìm thấy số điện thoại hoặc email trên trang web.",
        suggestion: "Thêm số điện thoại và địa chỉ rõ ràng, lý tưởng là ở đầu hoặc cuối mọi trang.",
      },
      googleYes: "Bạn đã có hồ sơ Google doanh nghiệp.",
      googleNo: "Salon của bạn chưa có hồ sơ Google doanh nghiệp.",
      googleUnsure: "Bạn chưa chắc salon đã có hồ sơ Google doanh nghiệp chưa.",
      googleSuggestionNo: "Tạo hồ sơ Google doanh nghiệp miễn phí — đây là nơi khách mới thường tìm đến đầu tiên.",
      googleSuggestionUnsure: "Tìm salon của bạn trên Google Maps để kiểm tra — nếu chưa có, hãy tạo một hồ sơ miễn phí.",
      socialMissing: (p: string) => `Chúng tôi không tìm thấy trang ${p} nào.`,
      socialMissingSuggestion: (p: string) => `Tạo trang ${p} cho salon và gắn link trên website.`,
      socialUnreachable: (p: string) => `Link ${p} bạn cung cấp có vẻ không còn hoạt động.`,
      socialUnreachableSuggestion: (p: string) => `Kiểm tra lại link trang ${p} của bạn.`,
      socialUnverified: (p: string) => `Chúng tôi tìm thấy link ${p} nhưng chưa thể tự động xác minh đầy đủ.`,
      socialOk: (p: string) => `Salon của bạn có trang ${p} đang hoạt động.`,
    },
  },
  en: {
    badge: "FREE & INSTANT",
    title: "How does your salon look online?",
    subtitle:
      "Tell us your salon's name and address. We'll check your website and social media — free, no sign-up needed.",
    formNameLabel: "Salon name",
    formAddressLabel: "Salon address",
    formWebsiteLabel: "Website · optional",
    formFacebookLabel: "Facebook link · optional",
    formInstagramLabel: "Instagram link · optional",
    formGoogleQuestion: "Does your salon already have a Google Business Profile?",
    formGoogleYes: "Yes",
    formGoogleNo: "No",
    formGoogleUnsure: "Not sure",
    submitButton: "Check for free now",
    noSignupNote: "No email, no sign-up needed. Your results show up right here.",
    checkingTitle: "Checking your salon",
    checkingSubtitle: "This only takes a few seconds.",
    stepWebsite: "Website",
    stepGoogle: "Google Business Profile",
    stepFacebook: "Facebook page",
    stepInstagram: "Instagram page",
    stepSummarizing: "Putting together your results",
    scorePrefix: "Your online presence score",
    bandExcellent: "EXCELLENT",
    bandGood: "GOOD — STILL ROOM TO GROW",
    bandNeedsWork: "NEEDS WORK",
    bandUrgent: "NEEDS ATTENTION NOW",
    channelWebsite: "Website",
    channelGoogle: "Google profile",
    channelFacebook: "Facebook",
    channelInstagram: "Instagram",
    strongLabel: "STRONG",
    okLabel: "OK",
    weakLabel: "WEAK",
    viewDetails: "View details",
    hideDetails: "Hide",
    goodThings: "What's working",
    needsWork: "Needs work",
    opportunitiesTitle: "Your biggest opportunities",
    opportunitiesSubtitle: "The things that most affect whether a customer picks your salon.",
    impactHigh: "HIGH IMPACT",
    impactMedium: "MEDIUM IMPACT",
    impactLow: "LOW IMPACT",
    whatToDo: "WHAT TO DO",
    actionPlanTitle: "Action plan",
    actionPlanSubtitle: "Everything worth doing, in priority order.",
    allGoodTitle: "Everything looks good!",
    allGoodBody: "We didn't find any major issues — your salon has a solid online presence.",
    viewOnGoogleMaps: "Find on Google Maps",
    disclaimerGoogle: "(Based on what you told us — we haven't automatically verified a real rating/review count.)",
    disclaimerSocial: "(We only check whether the link works — we don't read real engagement numbers.)",
    ctaTitle: "No online booking page yet?",
    ctaSubtitle:
      "VaraaAi.Com gives you a professional salon page with online booking, completely free — ready in 5 minutes, no coding needed.",
    ctaButton: "Create your free salon page",
    checkAnotherButton: "Check another salon",
    checks: {
      websiteMissing: {
        status: "Your salon doesn't have a website.",
        suggestion: "Create a free profile + booking page on VaraaAi — no coding needed.",
      },
      websiteUnreachable: {
        status: "We couldn't reach the website you provided — it may be down or no longer active.",
        suggestion: "Check whether your website is still live, or create a new one for free on VaraaAi.",
      },
      https: {
        pass: "Your website uses HTTPS, which is safe for visitors.",
        fail: "Your website isn't using HTTPS yet.",
        suggestion: "Enable an SSL/HTTPS certificate — most hosting providers offer this for free.",
      },
      mobile: {
        pass: "Your website is optimized for mobile.",
        fail: "Your website may not display well on mobile.",
        suggestion: "Make sure your website has a responsive layout for mobile — most customers browse on their phone.",
      },
      og: {
        pass: "When your link is shared, it shows a full preview with an image and description.",
        fail: "When someone shares your website's link, the preview can show up blank.",
        suggestion: "Add Open Graph tags (og:title, og:image, og:description) to your website.",
      },
      booking: {
        pass: "Your website mentions booking.",
        fail: "We didn't see a clear booking button or link on your website.",
        suggestion: "Add a prominent \"Book now\" button on your homepage — or use VaraaAi's free booking page.",
      },
      pricing: {
        pass: "Your website shows service prices.",
        fail: "We didn't see a price list on your website.",
        suggestion: "Show prices (or starting prices) for your main services — customers often skip salons with no visible pricing.",
      },
      hours: {
        pass: "Your website lists opening hours.",
        fail: "We didn't see opening hours on your website.",
        suggestion: "Add your daily opening hours to the homepage — many customers leave if they don't know you're open.",
      },
      contact: {
        pass: "Contact info is easy to find on your website.",
        fail: "We couldn't find a phone number or email on your website.",
        suggestion: "Add a clear phone number and address, ideally in the header or footer of every page.",
      },
      googleYes: "You already have a Google Business Profile.",
      googleNo: "Your salon doesn't have a Google Business Profile yet.",
      googleUnsure: "You're not sure whether your salon has a Google Business Profile.",
      googleSuggestionNo: "Create a free Google Business Profile — it's usually the first place new customers look.",
      googleSuggestionUnsure: "Search for your salon on Google Maps to check — if it's missing, create a free profile.",
      socialMissing: (p: string) => `We couldn't find a ${p} page.`,
      socialMissingSuggestion: (p: string) => `Create a ${p} page for your salon and link it from your website.`,
      socialUnreachable: (p: string) => `The ${p} link you gave us doesn't seem to work anymore.`,
      socialUnreachableSuggestion: (p: string) => `Double-check your ${p} page link.`,
      socialUnverified: (p: string) => `We found a ${p} link but couldn't fully verify it automatically.`,
      socialOk: (p: string) => `Your salon has an active ${p} page.`,
    },
  },
};

type Strings = (typeof STRINGS)["vi"];

function scoreBand(score: number, t: Strings) {
  if (score >= 85) return { label: t.bandExcellent, color: "text-sage-600" };
  if (score >= 70) return { label: t.bandGood, color: "text-primary-600" };
  if (score >= 50) return { label: t.bandNeedsWork, color: "text-coral-600" };
  return { label: t.bandUrgent, color: "text-berry-600" };
}

function channelBand(score: number, t: Strings) {
  if (score >= 80) return t.strongLabel;
  if (score >= 55) return t.okLabel;
  return t.weakLabel;
}

export function SalonCheckTool({ locale }: { locale: string }) {
  const t: Strings = STRINGS[locale as keyof typeof STRINGS] ?? STRINGS.en;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [googleStatus, setGoogleStatus] = useState<GoogleStatus>("unsure");

  const [phase, setPhase] = useState<"form" | "checking" | "result">("form");
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<SalonCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openChannel, setOpenChannel] = useState<string | null>(null);

  const STEPS = [t.stepWebsite, t.stepGoogle, t.stepFacebook, t.stepInstagram, t.stepSummarizing];

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPhase("checking");
    setStep(0);
    setError(null);

    const minAnimation = new Promise<void>((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        i += 1;
        setStep(i);
        if (i >= STEPS.length - 1) clearInterval(interval);
      }, 750);
      setTimeout(() => {
        clearInterval(interval);
        resolve();
      }, STEPS.length * 750);
    });

    const fetchPromise = fetch("/api/salon-check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        address,
        website: website || undefined,
        facebookUrl: facebookUrl || undefined,
        instagramUrl: instagramUrl || undefined,
        googleStatus,
      }),
    });

    const [, res] = await Promise.all([minAnimation, fetchPromise]);
    if (!res.ok) {
      setError(locale === "vi" ? "Có lỗi xảy ra, vui lòng thử lại." : "Something went wrong, please try again.");
      setPhase("form");
      return;
    }
    const data = (await res.json()) as SalonCheckResult;
    setResult(data);
    setPhase("result");
  }

  function reset() {
    setPhase("form");
    setResult(null);
    setStep(0);
    setOpenChannel(null);
  }

  if (phase === "checking") {
    return (
      <div className="card mx-auto max-w-md p-6">
        <p className="mb-1 font-bold text-ink-900">{t.checkingTitle}</p>
        <p className="mb-4 text-sm text-ink-400">{t.checkingSubtitle}</p>
        <div className="space-y-2.5">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2.5 text-sm">
              {i < step ? (
                <Check className="h-4 w-4 shrink-0 text-sage-500" />
              ) : i === step ? (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin text-primary-500" />
              ) : (
                <span className="h-4 w-4 shrink-0 rounded-full border border-ink-100" />
              )}
              <span className={i <= step ? "text-ink-900" : "text-ink-400"}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (phase === "result" && result) {
    const band = scoreBand(result.overallScore, t);
    const channels = [
      { key: "website", icon: Globe, label: t.channelWebsite, score: result.website.score },
      { key: "google", icon: MapPin, label: t.channelGoogle, score: result.google.score },
      { key: "facebook", icon: Facebook, label: t.channelFacebook, score: result.facebook.score },
      { key: "instagram", icon: Instagram, label: t.channelInstagram, score: result.instagram.score },
    ];

    const opportunities: Opportunity[] = [];
    const c = t.checks;
    if (!result.website.provided) {
      opportunities.push({ id: "website_missing", severity: "high", text: c.websiteMissing.status, suggestion: c.websiteMissing.suggestion });
    } else if (!result.website.reachable) {
      opportunities.push({ id: "website_unreachable", severity: "high", text: c.websiteUnreachable.status, suggestion: c.websiteUnreachable.suggestion });
    } else {
      if (!result.website.hasBookingLink) opportunities.push({ id: "booking", severity: "high", text: c.booking.fail, suggestion: c.booking.suggestion });
      if (!result.website.hasHours) opportunities.push({ id: "hours", severity: "medium", text: c.hours.fail, suggestion: c.hours.suggestion });
      if (!result.website.hasContact) opportunities.push({ id: "contact", severity: "medium", text: c.contact.fail, suggestion: c.contact.suggestion });
      if (!result.website.hasPricing) opportunities.push({ id: "pricing", severity: "medium", text: c.pricing.fail, suggestion: c.pricing.suggestion });
      if (!result.website.mobileFriendly) opportunities.push({ id: "mobile", severity: "medium", text: c.mobile.fail, suggestion: c.mobile.suggestion });
      if (!result.website.https) opportunities.push({ id: "https", severity: "low", text: c.https.fail, suggestion: c.https.suggestion });
      if (!result.website.hasOpenGraph) opportunities.push({ id: "og", severity: "low", text: c.og.fail, suggestion: c.og.suggestion });
    }
    if (result.google.status === "no") {
      opportunities.push({ id: "google_no", severity: "high", text: c.googleNo, suggestion: c.googleSuggestionNo });
    } else if (result.google.status === "unsure") {
      opportunities.push({ id: "google_unsure", severity: "medium", text: c.googleUnsure, suggestion: c.googleSuggestionUnsure });
    }
    if (result.facebook.status === "missing") {
      opportunities.push({ id: "fb_missing", severity: "high", text: c.socialMissing("Facebook"), suggestion: c.socialMissingSuggestion("Facebook") });
    } else if (result.facebook.status === "unreachable") {
      opportunities.push({ id: "fb_unreachable", severity: "medium", text: c.socialUnreachable("Facebook"), suggestion: c.socialUnreachableSuggestion("Facebook") });
    }
    if (result.instagram.status === "missing") {
      opportunities.push({ id: "ig_missing", severity: "high", text: c.socialMissing("Instagram"), suggestion: c.socialMissingSuggestion("Instagram") });
    } else if (result.instagram.status === "unreachable") {
      opportunities.push({ id: "ig_unreachable", severity: "medium", text: c.socialUnreachable("Instagram"), suggestion: c.socialUnreachableSuggestion("Instagram") });
    }

    const severityRank = { high: 0, medium: 1, low: 2 };
    opportunities.sort((a, b) => severityRank[a.severity] - severityRank[b.severity]);
    const topOpportunities = opportunities.slice(0, 3);

    const strongest = channels.reduce((a, b) => (b.score > a.score ? b : a));
    const weakest = channels.reduce((a, b) => (b.score < a.score ? b : a));

    function channelDetails(key: string): { good: string[]; bad: string[] } {
      if (key === "website") {
        const w = result!.website;
        if (!w.provided) return { good: [], bad: [c.websiteMissing.status] };
        if (!w.reachable) return { good: [], bad: [c.websiteUnreachable.status] };
        const good: string[] = [];
        const bad: string[] = [];
        (w.https ? good : bad).push(w.https ? c.https.pass : c.https.fail);
        (w.mobileFriendly ? good : bad).push(w.mobileFriendly ? c.mobile.pass : c.mobile.fail);
        (w.hasOpenGraph ? good : bad).push(w.hasOpenGraph ? c.og.pass : c.og.fail);
        (w.hasBookingLink ? good : bad).push(w.hasBookingLink ? c.booking.pass : c.booking.fail);
        (w.hasPricing ? good : bad).push(w.hasPricing ? c.pricing.pass : c.pricing.fail);
        (w.hasHours ? good : bad).push(w.hasHours ? c.hours.pass : c.hours.fail);
        (w.hasContact ? good : bad).push(w.hasContact ? c.contact.pass : c.contact.fail);
        return { good, bad };
      }
      if (key === "google") {
        if (result!.google.status === "yes") return { good: [c.googleYes], bad: [] };
        if (result!.google.status === "no") return { good: [], bad: [c.googleNo] };
        return { good: [], bad: [c.googleUnsure] };
      }
      const platform = key === "facebook" ? "Facebook" : "Instagram";
      const status = key === "facebook" ? result!.facebook.status : result!.instagram.status;
      if (status === "ok") return { good: [c.socialOk(platform)], bad: [] };
      if (status === "missing") return { good: [], bad: [c.socialMissing(platform)] };
      if (status === "unreachable") return { good: [], bad: [c.socialUnreachable(platform)] };
      return { good: [], bad: [c.socialUnverified(platform)] };
    }

    return (
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="card p-6 text-center">
          <div className="mx-auto mb-3 flex h-24 w-24 items-center justify-center rounded-full border-4 border-primary-100">
            <span className="text-4xl font-extrabold text-ink-900">{result.overallScore}</span>
          </div>
          <p className="text-sm text-ink-400">{t.scorePrefix} · {result.overallScore} / 100</p>
          <p className={`mt-1 text-xs font-bold tracking-wide ${band.color}`}>{band.label}</p>
          <p className="mx-auto mt-3 max-w-md text-sm text-ink-700">
            {result.name} — {strongest.label} ({strongest.score}) {locale === "vi" ? "là điểm mạnh nhất" : "is your strongest channel"},{" "}
            {weakest.label} ({weakest.score}) {locale === "vi" ? "cần cải thiện nhiều nhất." : "needs the most work."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {channels.map((ch) => {
            const details = channelDetails(ch.key);
            const isOpen = openChannel === ch.key;
            return (
              <div key={ch.key} className="card p-4">
                <div className="mb-1 flex items-center gap-2">
                  <ch.icon className="h-4 w-4 text-primary-500" />
                  <span className="text-xs font-medium text-ink-400">{ch.label}</span>
                </div>
                <p className="text-2xl font-extrabold text-ink-900">{ch.score}</p>
                <p className="text-[10px] font-bold tracking-wide text-ink-400">{channelBand(ch.score, t)}</p>
                <button
                  onClick={() => setOpenChannel(isOpen ? null : ch.key)}
                  className="mt-2 flex items-center gap-1 text-xs font-medium text-primary-600 hover:underline"
                >
                  {isOpen ? t.hideDetails : t.viewDetails}
                  <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="mt-3 space-y-2 border-t border-ink-100 pt-3 text-xs">
                    {details.good.length > 0 && (
                      <div>
                        <p className="mb-1 font-semibold text-sage-600">{t.goodThings}</p>
                        {details.good.map((line, i) => (
                          <p key={i} className="flex items-start gap-1.5 text-ink-700">
                            <Check className="mt-0.5 h-3 w-3 shrink-0 text-sage-500" /> {line}
                          </p>
                        ))}
                      </div>
                    )}
                    {details.bad.length > 0 && (
                      <div>
                        <p className="mb-1 font-semibold text-berry-600">{t.needsWork}</p>
                        {details.bad.map((line, i) => (
                          <p key={i} className="flex items-start gap-1.5 text-ink-700">
                            <X className="mt-0.5 h-3 w-3 shrink-0 text-berry-500" /> {line}
                          </p>
                        ))}
                      </div>
                    )}
                    {ch.key === "google" && (
                      <>
                        <p className="text-ink-400">{t.disclaimerGoogle}</p>
                        <a
                          href={googleMapsSearchUrl(result.name, result.address)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary-600 hover:underline"
                        >
                          {t.viewOnGoogleMaps}
                        </a>
                      </>
                    )}
                    {(ch.key === "facebook" || ch.key === "instagram") && (
                      <p className="text-ink-400">{t.disclaimerSocial}</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {topOpportunities.length > 0 && (
          <div>
            <h2 className="mb-1 flex items-center gap-2 text-lg font-bold text-ink-900">
              <HelpCircle className="h-5 w-5 text-primary-500" /> {t.opportunitiesTitle}
            </h2>
            <p className="mb-4 text-sm text-ink-400">{t.opportunitiesSubtitle}</p>
            <div className="space-y-3">
              {topOpportunities.map((op, i) => (
                <div key={op.id} className="card p-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink-900 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm text-ink-900">{op.text}</p>
                      <span
                        className={`mt-1 inline-block text-[10px] font-bold tracking-wide ${
                          op.severity === "high"
                            ? "text-berry-600"
                            : op.severity === "medium"
                              ? "text-coral-600"
                              : "text-ink-400"
                        }`}
                      >
                        {op.severity === "high" ? t.impactHigh : op.severity === "medium" ? t.impactMedium : t.impactLow}
                      </span>
                      <p className="mt-2 text-xs font-bold tracking-wide text-ink-400">{t.whatToDo}</p>
                      <p className="text-sm text-ink-700">{op.suggestion}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {opportunities.length === 0 && (
          <div className="card flex items-center gap-3 p-5">
            <Sparkles className="h-6 w-6 shrink-0 text-sage-500" />
            <div>
              <p className="font-semibold text-ink-900">{t.allGoodTitle}</p>
              <p className="text-sm text-ink-400">{t.allGoodBody}</p>
            </div>
          </div>
        )}

        {opportunities.length > topOpportunities.length && (
          <div>
            <h2 className="mb-1 text-lg font-bold text-ink-900">{t.actionPlanTitle}</h2>
            <p className="mb-4 text-sm text-ink-400">{t.actionPlanSubtitle}</p>
            <ol className="space-y-2">
              {opportunities.map((op, i) => (
                <li key={op.id} className="flex items-start gap-2.5 text-sm text-ink-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mist-100 text-[11px] font-bold text-ink-900">
                    {i + 1}
                  </span>
                  {op.suggestion}
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="card bg-ink-900 p-6 text-center text-white">
          <p className="text-lg font-bold">{t.ctaTitle}</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-ink-100">{t.ctaSubtitle}</p>
          <Link href="/business/apply" className="btn-accent mt-4 inline-flex !px-6 !py-3">
            {t.ctaButton}
          </Link>
        </div>

        <div className="text-center">
          <button onClick={reset} className="text-sm font-medium text-ink-400 hover:text-ink-700 hover:underline">
            {t.checkAnotherButton}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-6 text-center">
        <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold tracking-wide text-primary-600">
          {t.badge}
        </span>
        <h1 className="mt-3 text-2xl font-extrabold text-ink-900 sm:text-3xl">{t.title}</h1>
        <p className="mt-2 text-sm text-ink-400">{t.subtitle}</p>
      </div>

      <form onSubmit={onSubmit} className="card space-y-4 p-6">
        <div>
          <label className="label">{t.formNameLabel}</label>
          <input required className="input" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="label">{t.formAddressLabel}</label>
          <input required className="input" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <label className="label">{t.formWebsiteLabel}</label>
          <input
            className="input"
            placeholder="salon.com"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">{t.formFacebookLabel}</label>
            <input
              className="input"
              placeholder="facebook.com/..."
              value={facebookUrl}
              onChange={(e) => setFacebookUrl(e.target.value)}
            />
          </div>
          <div>
            <label className="label">{t.formInstagramLabel}</label>
            <input
              className="input"
              placeholder="instagram.com/..."
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
            />
          </div>
        </div>
        <div>
          <p className="label">{t.formGoogleQuestion}</p>
          <div className="flex gap-2">
            {(["yes", "unsure", "no"] as GoogleStatus[]).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setGoogleStatus(v)}
                className={`flex-1 rounded-xl border px-3 py-2 text-xs font-medium transition-colors ${
                  googleStatus === v
                    ? "border-primary-500 bg-primary-50 text-primary-600"
                    : "border-ink-100 text-ink-700 hover:border-ink-400"
                }`}
              >
                {v === "yes" ? t.formGoogleYes : v === "no" ? t.formGoogleNo : t.formGoogleUnsure}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-berry-500">{error}</p>}

        <button type="submit" className="btn-primary w-full py-3">
          {t.submitButton}
        </button>
        <p className="text-center text-xs text-ink-400">{t.noSignupNote}</p>
      </form>
    </div>
  );
}
