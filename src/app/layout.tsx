import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingOrderButton from "@/components/FloatingOrderButton";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ricenrolls.ca"),
  title: { default: "Rice N Rolls | Korean Food in Hamilton, ON 🍱", template: "%s | Rice N Rolls" },
  description: "Fresh Korean-inspired gimbap, bibimbap, K-pop chicken and more in Hamilton, Ontario. Great food, great prices — order online for pickup or delivery!",
  keywords: "Korean food Hamilton, gimbap Hamilton, Korean catering Ontario, bibimbap, K-pop chicken, student food Hamilton",
  alternates: { canonical: "https://www.ricenrolls.ca" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Rice N Rolls | Korean Food in Hamilton, ON 🍱",
    description: "Fresh Korean-inspired food in Hamilton. Order online for pickup or delivery!",
    type: "website", locale: "en_CA", siteName: "Rice N Rolls", url: "https://www.ricenrolls.ca",
  },
  twitter: { card: "summary_large_image", title: "Rice N Rolls | Korean Food in Hamilton, ON 🍱", description: "Fresh Korean rolls, bowls & more. Order now!" },
};

const schema = {
  "@context": "https://schema.org", "@type": "Restaurant", name: "Rice N Rolls",
  address: { "@type": "PostalAddress", streetAddress: "#3 2 Castlewood Blvd", addressLocality: "Hamilton", addressRegion: "ON", postalCode: "L9H 7M8", addressCountry: "CA" },
  telephone: "+12892388868", email: "contact@ricenrolls.ca", url: "https://www.ricenrolls.ca",
  servesCuisine: ["Korean", "Asian Fusion"], priceRange: "$$",
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "11:00", closes: "19:30" },
  ],
  sameAs: ["https://www.instagram.com/ricenrollsdundas/", "https://www.facebook.com/profile.php?id=61561324612315"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </head>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingOrderButton />
      </body>
    </html>
  );
}
