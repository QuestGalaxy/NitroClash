import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NitroClash | Post-Apocalyptic NFT Racing",
  description: "The ultimate post-apocalyptic NFT racing experience. Survive the wasteland.",
  metadataBase: new URL("http://nitroclash.net"),
  openGraph: {
    title: "NitroClash | Post-Apocalyptic NFT Racing",
    description: "The ultimate post-apocalyptic NFT racing experience. Survive the wasteland.",
    url: "http://nitroclash.net",
    siteName: "NitroClash",
    images: [
      {
        url: "/img/banner.jpeg",
        width: 1200,
        height: 630,
        alt: "NitroClash Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NitroClash | Post-Apocalyptic NFT Racing",
    description: "The ultimate post-apocalyptic NFT racing experience. Survive the wasteland.",
    creator: "@nitroclashnet",
    images: ["/img/banner.jpeg"],
  },
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
