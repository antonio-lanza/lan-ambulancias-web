"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  title: string;
  className?: string;
  autoPlayWhenVisible?: boolean;
  objectPosition?: string;
  /** Se definido, só um vídeo deste grupo toca por vez. */
  exclusiveGroup?: string;
};

const exclusivePlayers = new Map<string, Set<HTMLVideoElement>>();

function registerExclusive(group: string, el: HTMLVideoElement) {
  let set = exclusivePlayers.get(group);
  if (!set) {
    set = new Set();
    exclusivePlayers.set(group, set);
  }
  set.add(el);
}

function unregisterExclusive(group: string, el: HTMLVideoElement) {
  const set = exclusivePlayers.get(group);
  if (!set) return;
  set.delete(el);
  if (set.size === 0) exclusivePlayers.delete(group);
}

function pauseExclusiveOthers(group: string, current: HTMLVideoElement) {
  exclusivePlayers.get(group)?.forEach((video) => {
    if (video !== current && !video.paused) video.pause();
  });
}

export function LazyVideo({
  src,
  poster,
  title,
  className = "",
  autoPlayWhenVisible = false,
  objectPosition = "center",
  exclusiveGroup,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  // Uma vez iniciado, a capa não volta — pausar ou arrastar a barra não recria o overlay.
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          if (autoPlayWhenVisible && videoRef.current) {
            void videoRef.current.play().catch(() => undefined);
          }
        } else if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
        }
      },
      { rootMargin: "140px", threshold: 0.12 },
    );

    io.observe(node);
    return () => io.disconnect();
  }, [autoPlayWhenVisible]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !exclusiveGroup) return;

    registerExclusive(exclusiveGroup, video);
    return () => unregisterExclusive(exclusiveGroup, video);
  }, [exclusiveGroup, active]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || autoPlayWhenVisible) return;

    const blockNativeFullscreen = () => {
      if (document.fullscreenElement === video) {
        void document.exitFullscreen().catch(() => undefined);
      }
      const webkit = video as HTMLVideoElement & {
        webkitDisplayingFullscreen?: boolean;
        webkitExitFullscreen?: () => void;
      };
      if (webkit.webkitDisplayingFullscreen) webkit.webkitExitFullscreen?.();
    };

    video.addEventListener("webkitbeginfullscreen", blockNativeFullscreen);
    document.addEventListener("fullscreenchange", blockNativeFullscreen);
    return () => {
      video.removeEventListener("webkitbeginfullscreen", blockNativeFullscreen);
      document.removeEventListener("fullscreenchange", blockNativeFullscreen);
    };
  }, [autoPlayWhenVisible, started]);

  const start = () => {
    const v = videoRef.current;
    if (!v) return;
    setActive(true);
    setStarted(true);
    if (exclusiveGroup) pauseExclusiveOthers(exclusiveGroup, v);
    void v.play();
  };

  return (
    <div ref={wrapRef} className={`relative overflow-hidden bg-black ${className}`}>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition }}
        poster={poster}
        playsInline
        preload="none"
        muted={autoPlayWhenVisible}
        loop={autoPlayWhenVisible}
        controls={!autoPlayWhenVisible && started}
        controlsList="nofullscreen nodownload noremoteplayback"
        disablePictureInPicture
        title={title}
        onPlay={() => {
          const v = videoRef.current;
          if (exclusiveGroup && v) pauseExclusiveOthers(exclusiveGroup, v);
          setStarted(true);
        }}
      >
        {active ? <source src={src} type="video/mp4" /> : null}
      </video>

      {!started ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt={`Capa do depoimento: ${title}`}
            className="absolute inset-0 z-[1] h-full w-full object-cover"
            style={{ objectPosition }}
          />
          <button
            type="button"
            onClick={start}
            aria-label={`Reproduzir ${title}`}
            className="absolute inset-0 z-10 bg-gradient-to-t from-black/55 via-black/15 to-black/10 transition hover:from-black/65"
          >
            <span className="absolute top-1/2 left-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-green text-forest shadow-[0_12px_28px_rgba(0,194,65,0.4)]">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
                className="translate-x-[1.5px]"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        </>
      ) : null}
    </div>
  );
}
