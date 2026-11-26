import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };
const base = ({ size = 22, ...p }: P) => ({
  width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true, ...p,
});

export const IconPlay = (p: P) => (<svg {...base(p)} fill="currentColor" stroke="none"><path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.6-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" /></svg>);
export const IconPause = (p: P) => (<svg {...base(p)} fill="currentColor" stroke="none"><rect x="6" y="4.5" width="4.2" height="15" rx="1.2" /><rect x="13.8" y="4.5" width="4.2" height="15" rx="1.2" /></svg>);
export const IconBack = (p: P) => (<svg {...base(p)}><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v4h4" /><text x="12" y="15.2" fontSize="7.5" textAnchor="middle" fill="currentColor" stroke="none" fontWeight="700">15</text></svg>);
export const IconFwd = (p: P) => (<svg {...base(p)}><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 4v4h-4" /><text x="12" y="15.2" fontSize="7.5" textAnchor="middle" fill="currentColor" stroke="none" fontWeight="700">30</text></svg>);
export const IconPrev = (p: P) => (<svg {...base(p)}><path d="M6 5v14" /><path d="M18 6.5v11a1 1 0 0 1-1.55.83L9 13.2a1.5 1.5 0 0 1 0-2.4l7.45-5.13A1 1 0 0 1 18 6.5Z" fill="currentColor" /></svg>);
export const IconNext = (p: P) => (<svg {...base(p)}><path d="M18 5v14" /><path d="M6 6.5v11a1 1 0 0 0 1.55.83L15 13.2a1.5 1.5 0 0 0 0-2.4L7.55 5.67A1 1 0 0 0 6 6.5Z" fill="currentColor" /></svg>);
export const IconMoon = (p: P) => (<svg {...base(p)}><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" /></svg>);
export const IconDownload = (p: P) => (<svg {...base(p)}><path d="M12 4v11" /><path d="m7 10 5 5 5-5" /><path d="M5 20h14" /></svg>);
export const IconCheck = (p: P) => (<svg {...base(p)}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>);
export const IconHome = (p: P) => (<svg {...base(p)}><path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1Z" /></svg>);
export const IconText = (p: P) => (<svg {...base(p)}><path d="M5 6h14M5 10h14M5 14h9M5 18h6" /></svg>);
export const IconBook = (p: P) => (<svg {...base(p)}><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5Z" /><path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5Z" /></svg>);
export const IconCalendar = (p: P) => (<svg {...base(p)}><rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></svg>);
export const IconGear = (p: P) => (<svg {...base(p)}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.1-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1.1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9c.26.6.85 1 1.51 1H21a2 2 0 1 1 0 4h-.09c-.66 0-1.25.4-1.51 1Z" /></svg>);
export const IconChevronDown = (p: P) => (<svg {...base(p)}><path d="m6 9 6 6 6-6" /></svg>);
export const IconChevronLeft = (p: P) => (<svg {...base(p)}><path d="m15 6-6 6 6 6" /></svg>);
export const IconChevronRight = (p: P) => (<svg {...base(p)}><path d="m9 6 6 6-6 6" /></svg>);
export const IconSpeaker = (p: P) => (<svg {...base(p)}><path d="M4 9.5v5h3.5L12 19V5L7.5 9.5Z" fill="currentColor" /><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" /></svg>);
export const IconFlame = (p: P) => (<svg {...base(p)}><path d="M12 21c4 0 6.5-2.6 6.5-6.2 0-3.6-2.6-5.8-4-8.3-.5 2.1-1.6 3.2-2.7 3.7.2-2.6-.8-5.3-3.3-7.2.2 3.2-1.7 5.2-3 7.2A7.4 7.4 0 0 0 5.5 14.8C5.5 18.4 8 21 12 21Z" /></svg>);
export const IconSparkle = (p: P) => (<svg {...base(p)}><path d="M12 3.5 13.9 9l5.6 1.9-5.6 1.9L12 18.5l-1.9-5.7-5.6-1.9L10.1 9Z" /></svg>);
export const IconHeadphones = (p: P) => (<svg {...base(p)}><path d="M4 15v-3a8 8 0 0 1 16 0v3" /><rect x="3.5" y="14" width="4.5" height="6.5" rx="1.5" /><rect x="16" y="14" width="4.5" height="6.5" rx="1.5" /></svg>);
export const IconClose = (p: P) => (<svg {...base(p)}><path d="M6 6l12 12M18 6 6 18" /></svg>);
export const IconTrash = (p: P) => (<svg {...base(p)}><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" /></svg>);
export const IconEye = (p: P) => (<svg {...base(p)}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="3" /></svg>);
export const IconSlow = (p: P) => (<svg {...base(p)}><path d="M12 4a8 8 0 1 0 8 8" /><path d="M12 8v4l2.5 2.5" /><path d="M17 3.5 20.5 7" /></svg>);
