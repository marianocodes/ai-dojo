import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Socialgram - Connect, Share, Discover",
  description: "A modern social media platform for connecting with friends and sharing your moments.",
  keywords: ["social media", "sharing", "connect", "community"],
  authors: [{ name: "Socialgram Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#1f2937", // Gray-800 for dark theme
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-gray-100`}
      >
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
