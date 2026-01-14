import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Protocol | NitroClash",
  description: "NitroClash privacy protocols and data sovereignty. In the wasteland, anonymity is your strongest armor.",
  openGraph: {
    title: "Privacy Protocol | NitroClash",
    description: "NitroClash privacy protocols and data sovereignty. In the wasteland, anonymity is your strongest armor.",
  },
  twitter: {
    title: "Privacy Protocol | NitroClash",
    description: "NitroClash privacy protocols and data sovereignty. In the wasteland, anonymity is your strongest armor.",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
