"use client";

import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { whatsappUrl } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl("Olá! Vim pelo site da LAN Ambulâncias.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(37,211,102,0.45)] transition hover:scale-105 md:right-6 md:bottom-6 md:h-14 md:w-14"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
