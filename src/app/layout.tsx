import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Outfit } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
import "./globals.css";

const display = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "LAN Ambulâncias 24h | Remoção e UTI móvel em Santa Catarina",
    template: "%s | LAN Ambulâncias 24h",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "ambulância Criciúma",
    "ambulância Santa Catarina",
    "UTI móvel SC",
    "remoção de pacientes",
    "transferência inter-hospitalar",
    "cobertura de eventos",
    "LAN Ambulâncias",
    "ambulância 24 horas",
  ],
  authors: [{ name: site.diretorTecnico.name }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "health",
  alternates: {
    canonical: "/",
    languages: { "pt-BR": "/" },
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: "LAN Ambulâncias 24h — Ambulância e UTI móvel em SC",
    description: site.description,
    images: [
      {
        url: "/media/photos/lan_firma.jpg",
        width: 1200,
        height: 630,
        alt: "LAN Ambulâncias 24h em Criciúma",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LAN Ambulâncias 24h",
    description: site.description,
    images: ["/media/photos/lan_firma.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "BR-SC",
    "geo.placename": "Criciúma",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#00C241" },
    { media: "(prefers-color-scheme: dark)", color: "#053508" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full antialiased">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
