// app/layout.tsx
import "@/app/globals.css";
import BottomNavMobile from "@/components/BottomNavMobile";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs"; // ← sin tokenCache
import { Inter } from "next/font/google";
import type React from "react";
import Header from "../components/Header";

export const metadata = {
  title: "HazloHub - Encuentra tu trabajo ideal",
  description:
    "Encuentra tu trabajo ideal en HazloHub, la plataforma que conecta a profesionales con oportunidades laborales. Explora ofertas de empleo, postúlate fácilmente y construye tu carrera con nosotros.",
  icons: {
    icon: "/icon.png",
  },
};

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
  themeColor: "#1d4ed8",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <html lang="es" suppressHydrationWarning>
        <body className={inter.className}>
          <Header />
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange>
            {children}
            <BottomNavMobile />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
