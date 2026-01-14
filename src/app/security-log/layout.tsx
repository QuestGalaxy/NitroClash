import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Log | NitroClash",
  description: "Detailed technical overview of the NitroClash security architecture and defensive protocols.",
  openGraph: {
    title: "Security Log | NitroClash",
    description: "Detailed technical overview of the NitroClash security architecture and defensive protocols.",
  },
  twitter: {
    title: "Security Log | NitroClash",
    description: "Detailed technical overview of the NitroClash security architecture and defensive protocols.",
  },
};

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
