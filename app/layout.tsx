import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
    title: "Barriguitas",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
