import Navbar from "@/components/navigation/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Image from "next/image";
import { FacebookIcon, InstagramIcon, PhoneIcon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export const metadata = {
  metadataBase: new URL("https://postgres-prisma.vercel.app"),
  title: "Vercel Postgres Demo with Prisma",
  description:
    "A simple Next.js app with Vercel Postgres as the database and Prisma as the ORM",
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
        {children}

        <footer>
          <div className="main-container py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex flex-col md:flex-row gap-4">
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
                <div className="flex flex-col">
                  <h3 className="text-lg font-medium">Ático Mágico</h3>
                  <p className="text-sm text-gray-500">
                    Somos una tienda de novedades
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm">Síguenos</h3>
                  <div className="flex flex-row gap-2">
                    <a href="#">
                      <InstagramIcon className="h-6 w-6 hover:text-primary transition-all" />
                    </a>
                    <a href="#">
                      <FacebookIcon className="h-6 w-6 hover:text-primary transition-all" />
                    </a>

                    <a href="#">
                      <FaWhatsapp className="h-6 w-6 hover:text-primary transition-all" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
