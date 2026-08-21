import { Reveal } from "@/components/motion/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { site, whatsappUrl } from "@/lib/site";

export function ContactCTA() {
  return (
    <section id="contato" className="relative overflow-hidden bg-green py-14 pb-24 md:py-24">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(5,53,8,0.12),transparent_45%,rgba(0,46,128,0.12))]" />
      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center md:px-8">
        <Reveal>
          <h2 className="font-display text-[1.85rem] font-black tracking-tight text-black sm:text-3xl md:text-5xl">
            Precisa de uma ambulância agora?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-black md:text-lg">
            Fale com a central da LAN Ambulâncias 24h. Atendimento em Criciúma e
            em todo o Estado de Santa Catarina.
          </p>
          <div className="mx-auto mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <a
              href={`tel:${site.phoneTel}`}
              className="inline-flex items-center justify-center rounded-full bg-forest px-7 py-3.5 text-base font-bold text-white transition hover:bg-ink"
            >
              {site.phoneDisplay}
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 text-base font-bold text-white transition hover:bg-ink"
            >
              <WhatsAppIcon size={18} className="text-white" />
              WhatsApp
            </a>
            <a
              href={`tel:${site.phoneSecondaryTel}`}
              className="inline-flex items-center justify-center rounded-full border border-forest/25 px-6 py-3.5 text-base font-semibold text-forest transition hover:bg-forest/5"
            >
              {site.phoneSecondaryDisplay}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
