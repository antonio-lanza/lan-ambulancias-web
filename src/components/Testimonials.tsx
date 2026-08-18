import { LazyVideo } from "@/components/LazyVideo";
import { Reveal } from "@/components/motion/Reveal";
import { videos } from "@/lib/media";

const depoimentos = [videos.hsj, videos.criciuma, videos.depoimento] as const;

export function Testimonials() {
  return (
    <section id="depoimentos" className="bg-forest py-16 text-white md:py-24">
      <div className="mx-auto max-w-[960px] px-5 md:px-8">
        <Reveal>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-10">
            <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-[2.75rem]">
              Depoimentos
            </h2>
            <p className="max-w-sm text-base leading-relaxed text-white/70 md:pb-1.5">
              Hospital São José, Criciúma EC e SATC — instituições que já
              contam com a LAN em seu dia a dia.
            </p>
          </div>
          <div className="mt-6 h-px w-full bg-white/15" />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-5 md:mt-10 md:grid-cols-3 md:gap-5">
          {depoimentos.map((video) => (
            <article
              key={video.src}
              className="mx-auto flex w-full max-w-[340px] flex-col overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.28)] md:max-w-none"
            >
              <LazyVideo
                src={video.src}
                poster={video.poster}
                title={video.title}
                exclusiveGroup="depoimentos"
                className="aspect-[9/16] w-full"
              />
              <div className="flex-1 bg-white/10 px-4 py-3 backdrop-blur-md">
                <p className="font-display text-[15px] font-extrabold tracking-tight text-white">
                  {video.title}
                </p>
                <p className="mt-0.5 text-[13px] leading-snug text-white/70">
                  {video.role} · {video.org}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
