import { Reveal } from "@/components/motion/Reveal";
import { faqs } from "@/lib/site";

export function Faq() {
  return (
    <section id="faq" className="bg-ice py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink md:text-[2.75rem]">
            Perguntas frequentes
          </h2>
          <div className="mt-6 h-px w-full bg-line" />
        </Reveal>

        <div className="mt-8 space-y-3 md:mt-10">
          {faqs.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.05}>
              <details
                className="group overflow-hidden rounded-2xl border border-line bg-white transition-[border-color,box-shadow] open:border-green/35 open:shadow-[0_16px_40px_rgba(5,53,8,0.08)]"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 marker:content-none [&::-webkit-details-marker]:hidden md:px-6 md:py-5">
                  <span className="font-display text-base font-bold leading-snug text-ink md:text-lg">
                    {item.q}
                  </span>
                  <span
                    className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ice text-green transition group-open:rotate-180 group-open:bg-green/15"
                    aria-hidden
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </summary>
                <div className="border-t border-line/80 px-5 pb-5 md:px-6 md:pb-6">
                  <p className="pt-4 text-[15px] leading-relaxed text-muted">
                    {item.a}
                  </p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
