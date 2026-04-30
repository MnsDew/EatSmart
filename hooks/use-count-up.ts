"use client";

import { useEffect, useState } from "react";

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

/**
 * Animates from 0 to `end` while `enabled` is true. Respects `prefers-reduced-motion`.
 */
export function useCountUp(
  end: number,
  opts: { durationMs?: number; enabled?: boolean } = {}
) {
  const { durationMs = 2600, enabled = true } = opts;
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setValue(0);
      return;
    }

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setValue(end);
      return;
    }

    setValue(0);
    let start: number | null = null;
    let raf = 0;

    const step = (now: number) => {
      if (start === null) start = now;
      const t = Math.min((now - start) / durationMs, 1);
      setValue(Math.round(easeOutCubic(t) * end));
      if (t < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, durationMs, enabled]);

  return value;
}
