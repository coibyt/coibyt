"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface SwitcherSlotContextValue {
  setSlot: (el: HTMLElement | null) => void;
}

const SwitcherSlotContext = createContext<SwitcherSlotContextValue | null>(null);

/** Lets a page claim the spot the branch switcher renders into, so it can be
 * laid out inline with that page's own header instead of always appearing as
 * its own standalone row above the page (see the bookings page, which folds
 * it into a single compact row on mobile). A page that never calls this
 * leaves the switcher exactly where it renders today. */
export function useSwitcherSlot() {
  const ctx = useContext(SwitcherSlotContext);
  if (!ctx) throw new Error("useSwitcherSlot must be used within DashboardBody");
  return ctx;
}

export function DashboardBody({
  switcher,
  children,
}: {
  switcher: ReactNode;
  children: ReactNode;
}) {
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  return (
    <SwitcherSlotContext.Provider value={{ setSlot }}>
      {slot ? createPortal(switcher, slot) : switcher && <div className="mb-4">{switcher}</div>}
      {children}
    </SwitcherSlotContext.Provider>
  );
}
