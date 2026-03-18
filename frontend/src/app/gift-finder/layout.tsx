import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gift Finder Quiz — Find the Perfect Watch Gift",
  description:
    "Answer 4 quick questions and we'll recommend the perfect watch gift for him. Personalized picks by budget, occasion, recipient, and style.",
  openGraph: {
    title: "Gift Finder Quiz — Find His Perfect Watch in 60 Seconds",
    description:
      "Not sure which watch to get? Our free Gift Finder Quiz matches you with the best watch gift based on your budget, occasion, and his style.",
    url: "https://wristnerd.xyz/gift-finder",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gift Finder Quiz — Find His Perfect Watch in 60 Seconds",
    description:
      "Not sure which watch to get? Our free Gift Finder Quiz matches you with the best watch gift based on your budget, occasion, and his style.",
  },
  alternates: {
    canonical: "https://wristnerd.xyz/gift-finder",
  },
};

export default function GiftFinderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
