import "@/app/globals.css";
import { Inter } from "next/font/google";
import type React from "react";

import Header from "../components/Header";

import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HazloHub - Encuentra tu trabajo ideal",
  description:
    "Encuentra tu trabajo ideal en HazloHub, la plataforma que conecta a profesionales con oportunidades laborales. Explora ofertas de empleo, postúlate fácilmente y construye tu carrera con nosotros.",
  icons: {
    icon: "/icon.png",
  },
};

export const viewport = {
  themeColor: "#1d4ed8",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <Header />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
