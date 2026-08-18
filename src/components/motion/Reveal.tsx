"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  duration = 0.85,
  ease = "power2.out",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.style.opacity = "1";
      el.style.visibility = "visible";
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(el, { autoAlpha: 0 });

      gsap.to(el, {
        autoAlpha: 1,
        duration,
        delay,
        ease,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, duration, ease]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
