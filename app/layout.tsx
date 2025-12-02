import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ErrorBoundary from "../components/ErrorBoundary";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HealthMed - Transforme sua Educação Médica",
  description: "Plataforma de ensino médico online com conteúdo especializado, desenvolvido por médicos. Estude no seu ritmo e acelere sua carreira na área da saúde.",
  keywords: ["educação médica", "cursos médicos online", "medicina", "saúde", "especialização médica"],
  authors: [{ name: "HealthMed" }],
  creator: "HealthMed",
  publisher: "HealthMed",
  openGraph: {
    title: "HealthMed - Transforme sua Educação Médica",
    description: "Plataforma de ensino médico online com conteúdo especializado, desenvolvido por médicos.",
    url: "https://healthmed.com.br",
    siteName: "HealthMed",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
