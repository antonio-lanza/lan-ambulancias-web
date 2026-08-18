"use client";

import { useEffect, useRef } from "react";
import { videos } from "@/lib/media";

export function FleetReel() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const node = wrapRef.current;
    const video = videoRef.current;
    if (!node || !video) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 },
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="mt-10 flex justify-center bg-forest px-0 py-0 md:mt-12"
    >
      <video
        ref={videoRef}
        className="mx-auto aspect-[9/16] h-[min(85vh,177vw)] w-auto max-w-full object-contain"
        poster={videos.comercial.poster}
        src={videos.comercial.src}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={videos.comercial.title}
      />
    </div>
  );
}
