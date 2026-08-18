import { FleetReel } from "@/components/FleetReel";
import { Reveal } from "@/components/motion/Reveal";

const lines = [
  "UTI adulto, pediátrica e neonatal",
  "Suporte básico e transferência hospitalar",
  "Saída imediata para atendimento",
] as const;

export function Fleet() {
  return (
    <section id="frota" className="overflow-hidden bg-ice pt-10 md:pt-14">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="font-display text-xs font-bold tracking-[0.24em] text-green-deep uppercase">
                Frota
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink md:text-5xl">
                Verde vivo na rua.
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">
              UTI móvel, suporte básico e saída imediata — a frota é o rosto da
              LAN em Santa Catarina.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-line md:grid-cols-3">
          {lines.map((line) => (
            <div key={line} className="bg-white px-6 py-6 md:px-7 md:py-8">
              <p className="font-display text-lg font-semibold leading-snug text-ink md:text-xl">
                {line}
              </p>
            </div>
          ))}
        </div>
      </div>

      <FleetReel />
    </section>
  );
}
