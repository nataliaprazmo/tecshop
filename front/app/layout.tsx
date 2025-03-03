import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TecSklep",
  description: "Sklep z najnowszą technologią, smartfonami, laptopami i akcesoriami",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${openSans.variable} antialiased overflow-x-hidden`}
      >
        <Header/>
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
