import "./globals.css";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { FacebookIcon, InstagramIcon } from "lucide-react";
import { Inter } from "next/font/google";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";

import FloatButton from "@/components/buttons/FloatButton";
import Navbar from "@/components/navigation/navbar/Navbar";
import SearchInput from "@/components/navigation/navbar/SearchInput";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  metadataBase: new URL("https://www.aticomagico.com"),
  title: "Inicio | Ático Mágico",
  description:
    "Somos una tienda virtual de ventas y novedades, con productos de alta calidad y a los mejores precios.",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Navbar />

        <div className="flex md:hidden ml-auto px-4 my-4">
          <SearchInput />
        </div>

        {children}

        <footer>
          <div className="main-container py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
              <div className="flex flex-col items-center md:flex-row gap-4">
                <div className="w-20">
                  <Image
                    src="/logo.png"
                    width={489}
                    height={300}
                    alt="Ático Mágico Logo"
                    className="w-20"
                    priority
                  />
                </div>
                <div className="flex flex-col items-center md:items-start">
                  <h3 className="text-lg font-medium">Ático Mágico</h3>
                  <p className="text-sm text-gray-500">
                    Somos una tienda de novedades
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm text-center md:text-left">Síguenos</h3>
                  <div className="flex flex-row gap-2">
                    <a href="https://instagram.com/aticomagico.ventas">
                      <InstagramIcon className="h-6 w-6 hover:text-primary transition-all" />
                    </a>
                    <a href="https://www.facebook.com/people/Atico-Magico/61555341675125/">
                      <FacebookIcon className="h-6 w-6 hover:text-primary transition-all" />
                    </a>

                    <a
                      href={`https:/wa.me/${process.env.NEXT_PUBLIC_PHONE_NUMBER}`}
                      target="_blank"
                    >
                      <FaWhatsapp className="h-6 w-6 hover:text-primary transition-all" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <FloatButton />
        <Toaster />
      </body>
      <GoogleAnalytics gaId="G-00GQ771JV8" />
      <GoogleTagManager gtmId="GTM-P8DFFMTX" />
    </html>
  );
}
