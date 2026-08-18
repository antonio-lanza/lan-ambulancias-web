"use client";

import type { ReactNode } from "react";

export type PlateBlurConfig = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
  blur: number;
  feather: number;
  radius: number;
  scale: number;
};

export type PlateBlurFit = "contain" | "cover";

export type PlateBlurSet = {
  fit: PlateBlurFit;
  position?: string;
  plates: PlateBlurConfig[];
};

export const PLATE_BLURS = {
  hero: {
    fit: "contain" as const,
    position: "top",
    plates: [
      {
        x: 11.8,
        y: 86,
        width: 16.4,
        height: 6.8,
        rotate: 10,
        blur: 5,
        feather: 12,
        radius: 0.4,
        scale: 1.04,
      },
    ],
  },
  fleet: {
    fit: "contain" as const,
    position: "top",
    plates: [
      {
        x: 23.5,
        y: 79.55,
        width: 16,
        height: 3.55,
        rotate: 5,
        blur: 8,
        feather: 14,
        radius: 0.45,
        scale: 1.03,
      },
    ],
  },
  remocoes: {
    fit: "cover" as const,
    position: "center 45%",
    plates: [
      {
        x: 28.4,
        y: 66.7,
        width: 7.9,
        height: 2.5,
        rotate: 0,
        blur: 10,
        feather: 12,
        radius: 0.4,
        scale: 1.02,
      },
    ],
  },
  eventos: {
    fit: "cover" as const,
    position: "center 48%",
    plates: [
      {
        x: 43.1,
        y: 79.4,
        width: 5.6,
        height: 2.8,
        rotate: 0,
        blur: 10,
        feather: 12,
        radius: 0.4,
        scale: 1.02,
      },
    ],
  },
  locacao: {
    fit: "cover" as const,
    position: "center 48%",
    plates: [
      {
        x: 54.9,
        y: 68.6,
        width: 5,
        height: 2.5,
        rotate: -6,
        blur: 10,
        feather: 10,
        radius: 0.35,
        scale: 1.02,
      },
      {
        x: 84.3,
        y: 64.7,
        width: 4.5,
        height: 2.2,
        rotate: -4,
        blur: 9,
        feather: 10,
        radius: 0.35,
        scale: 1.02,
      },
    ],
  },
  "area-protegida": {
    fit: "cover" as const,
    position: "center 52%",
    plates: [
      {
        x: 20.6,
        y: 97.1,
        width: 12,
        height: 4,
        rotate: -4,
        blur: 4,
        feather: 10,
        radius: 0.35,
        scale: 1.02,
      },
      {
        x: 54.9,
        y: 74.5,
        width: 7,
        height: 3.5,
        rotate: -3,
        blur: 10,
        feather: 10,
        radius: 0.35,
        scale: 1.02,
      },
      {
        x: 77.5,
        y: 66.7,
        width: 5,
        height: 2.5,
        rotate: -2,
        blur: 9,
        feather: 10,
        radius: 0.3,
        scale: 1.02,
      },
    ],
  },
  "op-galpao": {
    fit: "cover" as const,
    position: "center 48%",
    plates: [
      {
        x: 24,
        y: 76.5,
        width: 14,
        height: 4.2,
        rotate: 8,
        blur: 10,
        feather: 12,
        radius: 0.4,
        scale: 1.02,
      },
    ],
  },
  "op-traseira": {
    fit: "cover" as const,
    position: "center 52%",
    plates: [
      {
        x: 37,
        y: 86.5,
        width: 26,
        height: 5,
        rotate: 0,
        blur: 10,
        feather: 12,
        radius: 0.4,
        scale: 1.02,
      },
    ],
  },
} satisfies Record<string, PlateBlurSet>;

export type PlateBlurId = keyof typeof PLATE_BLURS;

export function PlateBlurProvider({ children }: { children: ReactNode }) {
  return children;
}

function plateMaskUrl(cfg: PlateBlurConfig) {
  const { x, y, width, height, rotate, feather, radius } = cfg;
  const cx = x + width / 2;
  const cy = y + height / 2;
  const blurX = (feather * 0.045).toFixed(3);
  const blurY = (feather * 0.018).toFixed(3);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
  <defs>
    <filter id="s" x="-50%" y="-80%" width="200%" height="260%">
      <feGaussianBlur stdDeviation="${blurX} ${blurY}"/>
    </filter>
  </defs>
  <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" ry="${radius}" fill="white" transform="rotate(${rotate} ${cx} ${cy})" filter="url(#s)"/>
</svg>`;

  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

type LayerProps = {
  src: string;
  config: PlateBlurConfig;
  fit: PlateBlurFit;
  position: string;
};

function PlateBlurLayer({ src, config, fit, position }: LayerProps) {
  const mask = plateMaskUrl(config);
  return (
    <span
      className="absolute inset-0"
      style={{
        WebkitMaskImage: mask,
        maskImage: mask,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          maxWidth: "none",
          objectFit: fit,
          objectPosition: position,
          filter: `blur(${config.blur}px)`,
          transform: `scale(${config.scale})`,
        }}
      />
    </span>
  );
}

type Props = {
  src: string;
  blurId?: PlateBlurId;
  config?: PlateBlurConfig | PlateBlurConfig[];
  fit?: PlateBlurFit;
  position?: string;
};

export function PlateBlur({ src, blurId, config, fit, position }: Props) {
  const set = blurId ? PLATE_BLURS[blurId] : undefined;
  const plates = config
    ? Array.isArray(config)
      ? config
      : [config]
    : (set?.plates ?? []);

  const resolvedFit = fit ?? set?.fit ?? "contain";
  const resolvedPos = position ?? set?.position ?? "top";

  if (plates.length === 0) return null;

  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 z-[2]">
      {plates.map((plate, i) => (
        <PlateBlurLayer
          key={i}
          src={src}
          config={plate}
          fit={resolvedFit}
          position={resolvedPos}
        />
      ))}
    </span>
  );
}
