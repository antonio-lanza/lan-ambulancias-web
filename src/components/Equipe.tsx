"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { photos } from "@/lib/media";

gsap.registerPlugin(ScrollTrigger);

export function Equipe() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".js-equipe-in",
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            once: true,
          },
        },
      );
    }, el);

    let frame = 0;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const view = window.innerHeight + rect.height;
      const progress = (window.innerHeight - rect.top) / view;
      const shift = (Math.min(1, Math.max(0, progress)) - 0.5) * 2;

      el.style.setProperty("--equipe-parallax-bg", `${shift * -18}px`);
      el.style.setProperty("--equipe-parallax-texto", `${shift * 14}px`);
      el.style.setProperty("--equipe-parallax-foto", `${shift * 36}px`);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="equipe"
      ref={rootRef}
      className="lan-equipe relative overflow-hidden bg-ice"
    >
      <div
        className="pointer-events-none absolute inset-0 will-change-transform"
        aria-hidden
        style={{ transform: "translateY(var(--equipe-parallax-bg, 0px))" }}
      >
        <div className="absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-green/20 blur-3xl" />
        <div className="absolute top-[-20%] right-[8%] h-[22rem] w-[22rem] rounded-full bg-navy/10 blur-3xl" />
        <div className="absolute right-[-10%] bottom-[-40%] h-[32rem] w-[32rem] rounded-full bg-green/15 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_40%,rgba(0,194,65,0.06)_100%)]" />
      </div>

      <div className="relative mx-auto grid h-full max-w-7xl items-center px-5 lg:grid-cols-2 lg:px-8">
        <h2
          className="js-equipe-in lan-equipe-texto relative z-10 font-display font-black tracking-[-0.02em] text-ink uppercase will-change-transform max-lg:mx-auto max-lg:text-center"
          style={{
            transform:
              "translate(var(--equipe-texto-x), calc(var(--equipe-texto-y) + var(--equipe-parallax-texto, 0px))) scale(var(--equipe-texto))",
          }}
        >
          <span className="block text-[clamp(2.6rem,6.5vw,6.25rem)] leading-[0.8]">
            Equipe
          </span>
          <span className="block text-[clamp(2.6rem,6.5vw,6.25rem)] leading-[0.8]">
            Dedicada
          </span>
          <span className="block text-[clamp(3.1rem,8.5vw,7.75rem)] leading-[0.8] text-green">
            24 horas
          </span>
        </h2>

        <div className="js-equipe-in lan-equipe-foto relative z-[5] mx-auto flex w-full items-end justify-center lg:-ml-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos.equipeCutout}
            alt="Equipe LAN Ambulâncias"
            width={1200}
            height={1600}
            className="will-change-transform"
            style={{
              height: "var(--equipe-foto)",
              width: "auto",
              transform:
                "translate(var(--equipe-foto-x), calc(var(--equipe-foto-y) + var(--equipe-parallax-foto, 0px)))",
            }}
          />
        </div>
      </div>
    </section>
  );
}
