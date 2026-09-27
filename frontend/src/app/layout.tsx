import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import  ThemeAndTitle  from "@/shared/config/titletext";
import "./globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SuxxesZ",
  description: "About me",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        {children}
        <ThemeAndTitle />
      </body>
    </html>
  );
}