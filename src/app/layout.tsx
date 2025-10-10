import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "@/components/ui/button";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MicroMatch | Influencer Partnerships for Niche Reach",
  description:
    "Discover vetted micro influencers and creatives to amplify your brand campaigns across social platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground`}
      >
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-border/60 bg-background/80 backdrop-blur-sm">
            <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  MM
                </span>
                MicroMatch
              </Link>
              <nav className="flex items-center gap-6 text-sm font-medium text-foreground/80">
                <Link href="/#categories" className="transition hover:text-foreground">
                  Categories
                </Link>
                <Link href="/#pricing" className="transition hover:text-foreground">
                  Pricing
                </Link>
                <Link href="/#faq" className="transition hover:text-foreground">
                  FAQ
                </Link>
                <Button size="sm" className="hidden sm:inline-flex">
                  Book a Demo
                </Button>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-border/60 bg-background/90">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-6 text-sm text-foreground/70 sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} MicroMatch. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <Link href="/privacy" className="transition hover:text-foreground">
                  Privacy
                </Link>
                <Link href="/terms" className="transition hover:text-foreground">
                  Terms
                </Link>
                <Link href="mailto:hello@micromatch.co" className="transition hover:text-foreground">
                  Contact
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
