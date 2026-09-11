"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function MotionShell({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (event: PointerEvent) => {
      root.style.setProperty("--pointer-x", `${(event.clientX / window.innerWidth - 0.5) * 18}px`);
      root.style.setProperty("--pointer-y", `${(event.clientY / window.innerHeight - 0.5) * 18}px`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return <div ref={rootRef} className="motion-shell">{children}</div>;
}
