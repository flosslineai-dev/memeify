import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Caveat } from "next/font/google";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const hand = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-hand-face",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s · Memeify",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Memeify",
    "meme coin",
    "meme coin generator",
    "social token",
    "Solana",
    "launch a meme coin",
    "AI token art",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FAFAFC",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${hand.variable} antialiased`}>
      <body className="min-h-full overflow-x-clip">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
