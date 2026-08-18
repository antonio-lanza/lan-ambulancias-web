import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { photos } from "@/lib/media";
import { site } from "@/lib/site";

export function Trust() {
  return (
    <section id="responsavel" className="relative overflow-hidden bg-navy-deep py-20 text-white md:py-28">
      <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-navy/50 blur-3xl" aria-hidden />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-5 md:grid-cols-2 md:px-8">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] md:aspect-[5/6]">
            <Image
              src={photos.funcionarios}
              alt="Equipe e operação da LAN Ambulâncias"
              fill
              sizes="(max-width:768px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 to-transparent" />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="font-display text-xs font-bold tracking-[0.24em] text-green uppercase">
            Responsabilidade técnica
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight md:text-5xl">
            Direção técnica médica identificada.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/80 md:text-lg">
            Informação essencial para pacientes, hospitais e empresas
            contratantes — registro e responsável técnico à vista.
          </p>

          <dl className="mt-8 space-y-5">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
              <dt className="text-xs tracking-[0.18em] text-white/60 uppercase">
                {site.diretorTecnico.title}
              </dt>
              <dd className="mt-2 font-display text-2xl font-bold">
                {site.diretorTecnico.name}
              </dd>
              <dd className="mt-1 text-green">{site.diretorTecnico.crm}</dd>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
              <dd className="font-display text-xl font-bold text-green md:text-2xl">
                {site.crmEmpresa}
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
