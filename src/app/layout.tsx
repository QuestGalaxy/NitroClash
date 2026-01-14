import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NitroClash | Post-Apocalyptic NFT Racing",
  description: "The ultimate post-apocalyptic NFT racing experience. Survive the wasteland.",
  icons: {
    icon: "/img/favicon.jpeg",
    shortcut: "/img/favicon.jpeg",
    apple: "/img/favicon.jpeg",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} antialiased bg-black text-white` }
      >
        {children}
      </body>
    </html>
  );
}
