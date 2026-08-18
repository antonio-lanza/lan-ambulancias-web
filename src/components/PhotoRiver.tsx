"use client";

import Image from "next/image";
import { operation } from "@/lib/media";

/** Faixa infinita de fotos reais — ritmo editorial, sem grid de cards. */
export function PhotoRiver() {
  const loop = [...operation, ...operation];

  return (
    <section
      id="galeria"
      aria-label="Galeria da operação LAN"
      className="overflow-hidden border-y border-green/20 bg-forest py-8 md:py-10"
    >
      <div className="mb-5 flex items-end justify-between px-5 md:px-8">
        <p className="font-display text-xs font-bold tracking-[0.28em] text-green uppercase">
          Operação real · material próprio
        </p>
        <p className="hidden text-sm text-white/50 sm:block">Deslize com o olhar</p>
      </div>

      <div className="lan-river relative flex w-max gap-3 md:gap-4">
        {loop.map((item, i) => (
          <figure
            key={`${item.src}-${i}`}
            className="relative h-44 w-64 shrink-0 overflow-hidden md:h-56 md:w-80"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="320px"
              className="object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest/90 to-transparent px-3 py-2 text-[11px] font-semibold tracking-wide text-white uppercase">
              {item.alt}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
