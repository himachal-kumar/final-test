import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/ui/page-transition";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NGO Crowdfunding Platform",
  description: "Support NGOs and make a difference through our crowdfunding platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased`}
      >
        <ToastProvider>
          <LanguageProvider>
            <ThemeProvider>
              <Navbar />
              <PageTransition>
                {children}
              </PageTransition>
            </ThemeProvider>
          </LanguageProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
