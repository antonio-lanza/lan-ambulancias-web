import Image from "next/image";
import { PlateBlur, type PlateBlurId } from "@/components/PlateBlur";
import { Reveal } from "@/components/motion/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { brand, photos } from "@/lib/media";
import { serviceProof, services, site, whatsappUrl } from "@/lib/site";

const visuals: Record<
  (typeof services)[number]["id"],
  {
    src: string;
    alt: string;
    position: string;
    w: number;
    h: number;
    blurId?: PlateBlurId;
  }
> = {
  remocoes: {
    src: photos.aeroporto,
    alt: "Ambulância LAN em remoção aeromédica no aeroporto",
    position: "center 45%",
    w: 960,
    h: 1280,
    blurId: "remocoes",
  },
  uti: {
    src: photos.hospitalUti,
    alt: "UTI móvel LAN em frente ao hospital",
    position: "center 42%",
    w: 744,
    h: 1024,
  },
  eventos: {
    src: photos.torcida,
    alt: "Cobertura de evento LAN no estádio",
    position: "center 48%",
    w: 1200,
    h: 1539,
    blurId: "eventos",
  },
  "area-protegida": {
    src: photos.hospitalSj,
    alt: "Frota LAN em cobertura no Hospital São José",
    position: "center 52%",
    w: 1024,
    h: 682,
    blurId: "area-protegida",
  },
  locacao: {
    src: photos.frotaRua,
    alt: "Frota LAN Ambulâncias disponível para locação",
    position: "center 48%",
    w: 1024,
    h: 682,
    blurId: "locacao",
  },
};

function serviceWhatsAppMessage(title: string) {
  return `Olá! Gostaria de solicitar o serviço de ${title} da LAN Ambulâncias.`;
}

export function Services() {
  return (
    <section id="servicos" className="bg-ice py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="relative hidden h-10 w-[140px] shrink-0 sm:block md:h-12 md:w-[170px]">
                <Image
                  src={brand.logo}
                  alt="LAN Ambulâncias 24h"
                  fill
                  sizes="170px"
                  className="object-contain object-left"
                />
              </div>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink md:text-5xl">
                Nossos serviços
              </h2>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={`tel:${site.phoneTel}`}
                className="rounded-full bg-green px-5 py-3 text-center text-sm font-bold text-forest transition hover:bg-green-mid sm:py-2.5"
              >
                Ligue {site.phoneDisplay}
              </a>
              <a
                href={whatsappUrl("Olá! Quero saber sobre os serviços da LAN.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-green-deep hover:text-green-deep sm:py-2.5"
              >
                <WhatsAppIcon size={16} className="text-ink" />
                WhatsApp
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 space-y-6 md:mt-16 md:space-y-8">
          {services.map((service, i) => {
            const visual = visuals[service.id];
            const photoRight = i % 2 === 1;

            return (
              <Reveal key={service.id} delay={i * 0.08}>
                <article className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_16px_40px_rgba(5,53,8,0.08)] lg:grid lg:grid-cols-2 lg:items-stretch">
                <div
                  className={`service-photo ${photoRight ? "lg:order-2" : ""}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={visual.src}
                    alt={visual.alt}
                    width={visual.w}
                    height={visual.h}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    style={{ objectPosition: visual.position }}
                  />
                  {visual.blurId ? (
                    <PlateBlur
                      src={visual.src}
                      blurId={visual.blurId}
                      position={visual.position}
                    />
                  ) : null}
                </div>

                <div
                  className={`flex flex-col items-center justify-center px-5 py-8 text-center md:px-10 md:py-12 ${
                    photoRight ? "lg:order-1" : ""
                  }`}
                  style={{
                    background:
                      "linear-gradient(155deg, #f0fbf3 0%, #c8f2d5 48%, #8fe0a8 100%)",
                  }}
                >
                  <h3 className="font-display text-[1.75rem] font-extrabold tracking-tight text-black md:text-4xl">
                    {service.title}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-black md:text-lg">
                    {service.text}
                  </p>
                  <a
                    href={whatsappUrl(serviceWhatsAppMessage(service.title))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black shadow-sm transition hover:bg-ice"
                  >
                    <WhatsAppIcon size={18} className="text-black" />
                    Solicitar no WhatsApp
                  </a>
                </div>
              </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-14 overflow-hidden rounded-2xl bg-forest text-white md:mt-16">
          <div className="grid md:grid-cols-3 md:divide-x md:divide-white/15">
            {serviceProof.map((line) => (
              <div
                key={line}
                className="border-b border-white/15 px-5 py-7 last:border-b-0 md:border-b-0 md:px-8 md:py-10"
              >
                <p className="font-display text-xl font-semibold leading-snug md:text-[1.35rem]">
                  {line}
                </p>
              </div>
            ))}
          </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
