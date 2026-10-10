import type { Metadata } from "next";
import "./globals.css";
import { archivo, inter } from "@/lib/fonts";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { PageTransitionOverlay } from "@/components/providers/page-transition-overlay";
import { JsonLd } from "@/components/json-ld";
import { localBusinessSchema, SITE } from "@/lib/schema";
import { business, fullAddress } from "@/lib/business";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${business.name} | ${business.tagline}`,
    template: `%s | ${business.name}`,
  },
  description: `Roadworthy certificates, mechanical repairs, car rentals and vehicle sales in Truganina VIC. Rated ${business.rating.value}★ from ${business.rating.count}+ Google reviews. ${fullAddress}.`,
  icons: {
    icon: "/favicon-logo.png",
    apple: "/favicon-logo.png",
  },
  openGraph: {
    type: "website",
    siteName: business.name,
    title: `${business.name} | ${business.tagline}`,
    description: business.servicesLine,
    url: SITE.url,
  },
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
