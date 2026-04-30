/** Site mark — `public/icon.png` */
export const BRAND_MARK_SRC = "/icon.png";

/** Soft frame: light border, inner padding, subtle ring + shadow */
export const brandMarkFrame = {
  nav: "h-9 w-9 sm:h-10 sm:w-10 rounded-2xl border border-slate-200/70 bg-white/95 p-1.5 object-contain shadow-sm ring-1 ring-slate-300/15",
  hero: "h-11 w-11 sm:h-12 sm:w-12 rounded-2xl border border-slate-200/70 bg-white/95 p-1.5 sm:p-2 object-contain shadow-md shadow-slate-900/5 ring-1 ring-slate-300/15",
  card: "rounded-xl border border-slate-200/70 bg-white p-1.5 shadow-sm ring-1 ring-slate-200/40",
  footer: "h-9 w-9 rounded-2xl border border-slate-200/70 bg-white/95 p-1.5 object-contain shadow-sm ring-1 ring-slate-300/15",
} as const;
