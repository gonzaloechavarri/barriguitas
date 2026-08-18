import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AppleSplashLinks } from "@/components/pwa/apple-splash-links";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const description =
  "Barriguitas es el sistema operativo familiar de Victoria y Gonzalo. Un lugar para tomar mejores decisiones juntos.";

export const metadata: Metadata = {
  title: {
    default: "Barriguitas",
    template: "%s · Barriguitas",
  },
  description,
  applicationName: "Barriguitas",
  appleWebApp: {
    capable: true,
    title: "Barriguitas",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "Barriguitas",
    description,
    siteName: "Barriguitas",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Barriguitas",
    description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#09090b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <head>
        <AppleSplashLinks />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
