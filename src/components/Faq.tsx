import { Reveal } from "@/components/motion/Reveal";
import { faqs } from "@/lib/site";

export function Faq() {
  return (
    <section id="faq" className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal>
          <p className="font-display text-xs font-bold tracking-[0.24em] text-green-deep uppercase">
            Perguntas frequentes
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
            Respostas diretas sobre a LAN
          </h2>
        </Reveal>

        <div className="mt-10 space-y-3">
          {faqs.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.04}>
              <details className="group rounded-2xl border border-line bg-ice px-5 py-4 open:bg-white open:shadow-[0_12px_40px_rgba(26,35,48,0.06)]">
                <summary className="cursor-pointer list-none font-display text-lg font-bold text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-4">
                    {item.q}
                    <span className="mt-1 text-green transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
