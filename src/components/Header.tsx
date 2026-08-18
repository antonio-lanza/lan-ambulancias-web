"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { nav, site, whatsappUrl } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-black/5 transition-[box-shadow,background] duration-300 ${
        scrolled ? "shadow-[0_8px_28px_rgba(5,53,8,0.12)]" : ""
      }`}
      style={{
        background: "rgba(255, 255, 255, 0.82)",
        backdropFilter: "blur(16px) saturate(1.2)",
        WebkitBackdropFilter: "blur(16px) saturate(1.2)",
      }}
    >
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-4 px-5 md:h-14 md:px-8">
        <a
          href="#topo"
          className="relative block h-7 w-[110px] shrink-0 md:h-8 md:w-[130px]"
          aria-label={site.name}
        >
          <Image
            src="/brand/lan_logo.png"
            alt="LAN Ambulâncias 24h"
            fill
            priority
            sizes="130px"
            className="object-contain object-left"
          />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-ink/70 transition hover:text-green-deep"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${site.phoneTel}`}
            className="rounded-full border border-line px-4 py-1.5 text-sm font-semibold text-ink transition hover:border-green-deep hover:text-green-deep"
          >
            {site.phoneDisplay}
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-green px-4 py-1.5 text-sm font-bold text-forest transition hover:bg-green-mid"
          >
            <WhatsAppIcon size={16} />
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="flex w-4 flex-col gap-1">
            <i className={`block h-0.5 bg-ink transition ${open ? "translate-y-[6px] rotate-45" : ""}`} />
            <i className={`block h-0.5 bg-ink transition ${open ? "opacity-0" : ""}`} />
            <i className={`block h-0.5 bg-ink transition ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-line bg-white/95 px-5 py-4 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col gap-3" aria-label="Mobile">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-2 text-base font-semibold text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={`tel:${site.phoneTel}`}
              className="mt-2 rounded-full bg-green px-4 py-3 text-center font-bold text-forest"
              onClick={() => setOpen(false)}
            >
              Ligar agora
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-line px-4 py-3 text-center font-bold text-ink"
              onClick={() => setOpen(false)}
            >
              <WhatsAppIcon size={16} />
              WhatsApp
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
