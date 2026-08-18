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
    default: site.seo.title,
    template: "%s | LAN Ambulâncias 24h",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "ambulância Criciúma",
    "ambulância Santa Catarina",
    "ambulância 24 horas SC",
    "UTI móvel Criciúma",
    "UTI móvel SC",
    "remoção de pacientes",
    "transferência inter-hospitalar",
    "cobertura de eventos ambulância",
    "LAN Ambulâncias",
    "ambulância particular SC",
    "Área Protegida ambulância",
  ],
  authors: [{ name: site.diretorTecnico.name }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "health",
  alternates: {
    canonical: "/",
    languages: { "pt-BR": "/" },
  },
  icons: {
    icon: [{ url: "/icon.png", sizes: "512x512", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: site.seo.ogTitle,
    description: site.description,
    images: [
      {
        url: "/media/photos/lan_firma.jpg",
        width: 1200,
        height: 630,
        alt: "Frota LAN Ambulâncias 24h em Criciúma, Santa Catarina",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.ogTitle,
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
