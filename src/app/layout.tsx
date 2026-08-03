import type { Metadata } from "next";
import { Inter_Tight, Inter, Instrument_Serif } from 'next/font/google'
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";

// Inter Tight — fonte principal de display (font-display)
const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-space',
  display: 'swap',
})

// Inter — corpo pequeno (font-body)
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

// Instrument Serif — acento decorativo (font-serif)
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL("https://lookcase.app.br"),
  title: "Lookcase — Vitrine digital para sua loja de roupas",
  description:
    "Crie uma loja online profissional em menos de 10 minutos. Suas clientes navegam, escolhem e pedem pelo WhatsApp — você só confirma. Sem taxa por venda.",
  keywords: [
    "vitrine digital",
    "loja virtual WhatsApp",
    "catálogo online roupas",
    "vender roupas online",
    "loja virtual para Instagram",
    "lookcase",
  ],
  openGraph: {
    title: "Lookcase — Vitrine digital para sua loja de roupas",
    description:
      "Crie uma loja profissional em 10 minutos. Suas clientes navegam e pedem pelo WhatsApp — você só confirma. 7 dias grátis, sem cartão.",
    url: "https://lookcase.app.br",
    siteName: "Lookcase",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lookcase — Vitrine digital para sua loja de roupas",
    description:
      "Vitrine profissional em 10 minutos. Seus clientes navegam e pedem pelo WhatsApp. 7 dias grátis.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={cn(interTight.variable, inter.variable, instrumentSerif.variable)}>
      <body className={`${interTight.variable} ${inter.variable} ${instrumentSerif.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
