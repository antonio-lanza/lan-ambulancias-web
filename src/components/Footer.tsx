import Image from "next/image";
import { InstagramIcon } from "@/components/InstagramIcon";
import { Reveal } from "@/components/motion/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { nav, site, whatsappUrl } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-forest text-white">
      <Reveal>
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <div className="text-center">
            <div className="relative mx-auto h-10 w-[160px]">
              <Image
                src="/brand/lan_logo.png"
                alt="LAN Ambulâncias"
                fill
                sizes="160px"
                className="object-contain object-center"
              />
            </div>
            <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-white/70">
              {site.name} — remoção, UTI móvel, eventos e plano Área Protegida.
              Base em {site.city}, atendimento em todo o Estado de {site.region}.
            </p>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/85 transition hover:text-white"
            >
              <InstagramIcon size={16} />
              {site.social.instagramHandle}
            </a>
          </div>

          <div className="mx-auto mt-12 h-px max-w-4xl bg-white/15" />

          <div className="mx-auto mt-10 grid max-w-4xl gap-8 md:mt-12 md:grid-cols-3 md:gap-8">
            <div className="text-center">
              <p className="font-display text-xs font-bold tracking-[0.2em] text-white/45 uppercase">
                Navegação
              </p>
              <ul className="mt-4 space-y-2.5 text-sm font-semibold text-white/85">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="hover:text-white">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center">
              <p className="font-display text-xs font-bold tracking-[0.2em] text-white/45 uppercase">
                Contato
              </p>
              <ul className="mt-4 space-y-2.5 text-sm font-semibold text-white/85">
                <li>
                  <a href={`tel:${site.phoneTel}`} className="hover:text-white">
                    {site.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${site.phoneSecondaryTel}`}
                    className="hover:text-white"
                  >
                    {site.phoneSecondaryDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-white"
                  >
                    <WhatsAppIcon size={14} className="text-white" />
                    WhatsApp 24h
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <p className="font-display text-xs font-bold tracking-[0.2em] text-white/45 uppercase">
                Médico Responsável
              </p>
              <p className="mx-auto mt-4 max-w-[16rem] text-sm leading-relaxed text-white/70">
                {site.diretorTecnico.name}
                <br />
                {site.diretorTecnico.crm}
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="border-t border-white/10 px-5 py-5 pb-[calc(4.25rem+env(safe-area-inset-bottom))] text-center text-xs text-white/50 md:px-8 md:pb-5">
        © {new Date().getFullYear()} {site.legalName}. Todos os direitos
        reservados.
      </div>
    </footer>
  );
}
