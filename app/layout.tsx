import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from '@/app/providers';
import Header from '@/components/header';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextBite",
  description: "Check the ingredients that you have at home and search in this API for a recipe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={inter.className}>
      <Providers>
        <Header />
        {children}
      </Providers>
    </body>
  </html>
  );
}