import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Appbar from "@/components/custom/Appbar";
import {
  ClerkProvider,
  
} from '@clerk/nextjs'
import { ConvexClientProvider } from "./ConvexClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const inter = Inter({ subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Urban Palate",
  description: "Trust and Taste",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter}{antialiased`}
      >
    <ConvexClientProvider>
    <ClerkProvider>
       <Appbar/>
       {children}
       </ClerkProvider>
    </ConvexClientProvider>
      </body>
    </html>
  );
}
