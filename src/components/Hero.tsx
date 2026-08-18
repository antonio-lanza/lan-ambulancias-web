"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { createTimeline } from "animejs";
import { PlateBlur } from "@/components/PlateBlur";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { brand, photos } from "@/lib/media";
import { site, whatsappUrl } from "@/lib/site";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !root.current) return;

    const tl = createTimeline({ defaults: { ease: "out(3)" } });
    tl.add(".js-hero-logo", { opacity: [0, 1], translateY: [10, 0], duration: 500 }, 0)
      .add(".js-hero-title", { opacity: [0, 1], translateY: [12, 0], duration: 600 }, 50)
      .add(".js-hero-sub", { opacity: [0, 1], translateY: [10, 0], duration: 500 }, 110)
      .add(".js-hero-cta", { opacity: [0, 1], translateY: [8, 0], duration: 450 }, 160)
      .add(".js-hero-ambulance", { opacity: [0, 1], duration: 650 }, 40);

    return () => {
      tl.cancel();
      root.current
        ?.querySelectorAll<HTMLElement>(
          ".js-hero-logo, .js-hero-title, .js-hero-sub, .js-hero-cta, .js-hero-ambulance",
        )
        .forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
    };
  }, []);

  return (
    <section
      id="topo"
      ref={root}
      className="relative overflow-hidden bg-navy-deep pt-12 md:pt-14"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(145deg,#0B2A5C_0%,#062044_45%,#04152E_78%,#020B18_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_35%,rgba(0,72,156,0.45),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_75%,rgba(0,194,65,0.12),transparent_48%)]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-start gap-4 px-5 pt-8 pb-20 md:gap-6 md:px-8 md:pt-12 md:pb-20 lg:grid-cols-2 lg:pt-14">
        <div className="flex flex-col items-center pt-8 text-center md:items-center md:pt-24 lg:pt-28">
          <h1 className="js-hero-title font-display text-[2.35rem] leading-[1.08] font-extrabold tracking-[-0.03em] text-white opacity-0 sm:text-[2.85rem] lg:text-[3.35rem]">
            <span className="mb-2 block text-[0.46em] font-bold tracking-[0.02em] text-white/90 sm:text-[0.44em]">
              LAN Ambulâncias 24h · Criciúma e Santa Catarina
            </span>
            Ambulância e UTI móvel{" "}
            <span className="text-green">agora</span>!
          </h1>

          <p className="js-hero-sub mt-4 max-w-md text-base leading-relaxed font-semibold text-white/90 opacity-0 md:text-xl">
            Remoção de pacientes, transferência inter-hospitalar e cobertura de
            eventos. Atendimento 24 horas em todo o Estado de Santa Catarina.
          </p>

          <div className="js-hero-cta mt-5 flex w-full max-w-sm flex-col items-stretch gap-2.5 opacity-0 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <a
              href={`tel:${site.phoneTel}`}
              className="inline-flex items-center justify-center rounded-full bg-green px-5 py-3 text-sm font-bold text-forest transition hover:bg-green-mid md:text-base"
            >
              Ligar {site.phoneDisplay}
            </a>
            <a
              href={whatsappUrl("Olá! Preciso de uma ambulância da LAN agora.")}
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: "#FFFFFF", color: "#1A2330" }}
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold no-underline transition hover:bg-ice md:text-base"
            >
              <WhatsAppIcon size={18} className="shrink-0 text-[#25D366]" />
              <span style={{ color: "#1A2330" }}>WhatsApp 24h</span>
            </a>
          </div>
        </div>

        <div className="js-hero-ambulance relative flex items-start justify-center opacity-0 md:justify-end">
          <div className="relative w-full max-w-[560px] lg:max-w-[640px]">
            <Image
              src={photos.heroFrente}
              alt="Ambulância LAN Ambulâncias 24h em Criciúma, Santa Catarina"
              width={960}
              height={905}
              priority
              unoptimized
              className="relative z-[1] h-auto w-full object-contain object-top drop-shadow-[0_22px_50px_rgba(0,0,0,0.45)]"
            />
            <PlateBlur src={photos.heroFrente} blurId="hero" />
          </div>
        </div>
      </div>

      <p className="absolute bottom-3 left-5 right-5 z-20 text-[10px] leading-snug text-white/70 sm:right-auto sm:whitespace-nowrap sm:text-[11px] md:bottom-6 md:left-8 md:text-xs">
        {site.diretorTecnico.title}: {site.diretorTecnico.name},{" "}
        {site.diretorTecnico.crm}
      </p>
    </section>
  );
}
