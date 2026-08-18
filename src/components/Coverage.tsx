import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { photos } from "@/lib/media";

export function Coverage() {
  return (
    <section id="cobertura" className="bg-white pt-20 pb-0 md:pt-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="font-display text-xs font-bold tracking-[0.24em] text-navy uppercase">
            Eventos e presença
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-ink md:text-5xl">
            No estádio, na torcida, no plantão.
          </h2>
        </Reveal>
      </div>

      {/* Banner full-bleed torcida */}
      <Reveal className="relative mt-10 h-[52vh] min-h-[320px] w-full md:h-[62vh]">
        <Image
          src={photos.torcida}
          alt="LAN Ambulâncias com a torcida no estádio"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/80 via-forest/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <p className="absolute bottom-8 left-5 max-w-md font-display text-2xl font-bold text-white md:left-8 md:text-4xl">
          Cobertura de grandes públicos
        </p>
      </Reveal>

      {/* Tríptico estádio — sem “card grid” genérico */}
      <div className="mx-auto grid max-w-7xl gap-px bg-line md:grid-cols-3">
        {[
          { src: photos.estadioFrente, alt: "Viatura LAN de frente no estádio", t: "Frente" },
          { src: photos.estadioAngulo, alt: "Viatura LAN em ângulo no estádio", t: "Ângulo" },
          { src: photos.estadioTraseira, alt: "Viatura LAN — traseira no estádio", t: "Plantão" },
        ].map((shot, i) => (
          <Reveal key={shot.src} delay={i * 0.05} className="relative aspect-[5/6] overflow-hidden bg-forest">
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              sizes="(max-width:768px) 100vw, 33vw"
              className="object-cover transition duration-700 hover:scale-[1.04]"
            />
            <span className="absolute top-4 left-4 font-display text-xs font-bold tracking-[0.22em] text-white uppercase drop-shadow">
              {shot.t}
            </span>
          </Reveal>
        ))}
      </div>

      {/* Base + centro + equipe — composição irregular */}
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <div className="grid gap-4 md:grid-cols-12 md:gap-5">
          <Reveal className="relative min-h-[280px] overflow-hidden md:col-span-7 md:min-h-[420px]">
            <Image
              src={photos.firma}
              alt="Base da LAN Ambulâncias"
              fill
              sizes="(max-width:768px) 100vw, 58vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/75 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <p className="text-xs tracking-[0.2em] text-green uppercase">Base</p>
              <p className="mt-1 font-display text-2xl font-bold md:text-3xl">
                Criciúma · operação própria
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 md:col-span-5">
            <Reveal delay={0.06} className="relative min-h-[200px] overflow-hidden md:min-h-[200px]">
              <Image
                src={photos.funcionarios}
                alt="Equipe LAN Ambulâncias"
                fill
                sizes="(max-width:768px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-forest/20" />
              <p className="absolute bottom-4 left-4 font-display text-lg font-bold text-white">
                Equipe
              </p>
            </Reveal>
            <Reveal delay={0.1} className="relative min-h-[200px] overflow-hidden md:min-h-[200px]">
              <Image
                src={photos.centro}
                alt="Centro de treinamento LAN"
                fill
                sizes="(max-width:768px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-navy-deep/25" />
              <p className="absolute bottom-4 left-4 font-display text-lg font-bold text-white">
                Centro de treinamento
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
