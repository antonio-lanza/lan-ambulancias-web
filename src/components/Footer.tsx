import Image from "next/image";
import { InstagramIcon } from "@/components/InstagramIcon";
import { Reveal } from "@/components/motion/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { brand } from "@/lib/media";
import { nav, site, whatsappUrl } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-forest text-white">
      <Reveal>
        <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-10">
            <div className="shrink-0 text-center md:text-left">
              <div className="relative mx-auto h-8 w-[130px] md:mx-0">
                <Image
                  src={brand.logo}
                  alt="LAN Ambulâncias"
                  fill
                  sizes="130px"
                  className="object-contain object-center md:object-left"
                />
              </div>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white/75 transition hover:text-white"
              >
                <InstagramIcon size={15} />
                {site.social.instagramHandle}
              </a>
              <p className="mx-auto mt-3 max-w-[14rem] text-sm leading-snug text-white/55 md:mx-0">
                {site.address.display}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 md:gap-x-12">
              <div className="flex flex-col items-center text-center">
                <p className="font-display text-[11px] font-bold tracking-[0.18em] text-white/45 uppercase">
                  Navegação
                </p>
                <ul className="mt-2.5 space-y-1.5 text-sm font-semibold text-white/85">
                  {nav.map((item) => (
                    <li key={item.href}>
                      <a href={item.href} className="hover:text-white">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col items-center text-center">
                <p className="font-display text-[11px] font-bold tracking-[0.18em] text-white/45 uppercase">
                  Contato
                </p>
                <ul className="mt-2.5 space-y-1.5 text-sm font-semibold text-white/85">
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
                      className="inline-flex items-center justify-center gap-1.5 hover:text-white"
                    >
                      <WhatsAppIcon size={14} className="text-white" />
                      WhatsApp 24h
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-span-2 flex flex-col items-center text-center sm:col-span-1">
                <p className="font-display text-[11px] font-bold tracking-[0.18em] text-white/45 uppercase">
                  Médico Responsável
                </p>
                <p className="mt-2.5 text-sm leading-snug text-white/70">
                  {site.diretorTecnico.name}
                  <br />
                  {site.diretorTecnico.crm}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="border-t border-white/10 px-5 py-3 pb-[calc(3.5rem+env(safe-area-inset-bottom))] text-center text-xs text-white/50 md:px-8 md:pb-3">
        © {new Date().getFullYear()} {site.legalName}. Todos os direitos
        reservados.
      </div>
    </footer>
  );
}
