import type { Metadata } from "next";
import "./globals.css";
import { archivo, inter } from "@/lib/fonts";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { PageTransitionOverlay } from "@/components/providers/page-transition-overlay";
import { JsonLd } from "@/components/json-ld";
import { localBusinessSchema, websiteSchema, SITE } from "@/lib/schema";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  // "./" resolves per-route against metadataBase, so every page gets its own
  // self-referencing canonical on the one preferred host.
  alternates: { canonical: "./" },
  title: {
    default: `Truganina Mechanic, Roadworthy & Car Rental | ${business.name}`,
    template: `%s | ${business.name}`,
  },
  description: `Roadworthy certificates, mechanical repairs, car rentals and vehicle sales from one Truganina workshop. ${business.rating.value}★ from ${business.rating.countLabel} Google reviews. Call ${business.phoneDisplay}.`,
  icons: {
    icon: "/favicon-logo.png",
    apple: "/favicon-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: business.name,
    title: `${business.name} | ${business.tagline}`,
    description: `Roadworthy certificates, mechanical repairs, car rentals and vehicle sales in Truganina VIC. ${business.rating.value}★ from ${business.rating.countLabel} Google reviews.`,
    url: SITE.url,
    images: [{ url: "/logo.png", width: 1254, height: 1254, alt: `${business.name} logo` }],
  },
  twitter: { card: "summary" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before first paint so the stored theme applies with no
            flash — localStorage/document aren't available in the inline
            @theme CSS, so this is the one place a blocking script is
            justified. Default (no attribute) is dark, matching the site's
            existing look for anyone who's never toggled. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"){document.documentElement.setAttribute("data-theme","light");}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <JsonLd data={localBusinessSchema()} />
        <JsonLd data={websiteSchema()} />
        <PageTransitionOverlay />
        <SmoothScrollProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
