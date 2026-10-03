import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import SearchModal from "@/components/SearchModal";

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://starryak.in"),
  title: "Starry AK | Artisanal Hand-Poured Scented Candles",
  description:
    "Hand-poured scented candles crafted in India with 100% natural soy wax blend. Moments worth remembering with bespoke scents for homes, weddings, and celebrations.",
  keywords: [
    "scented candles India",
    "hand poured candles",
    "soy wax candles",
    "personalized candles India",
    "Diwali candle gifts",
    "wedding favors candles",
    "luxury scented candles",
    "Starry AK candles",
  ],
  openGraph: {
    title: "Starry AK | Artisanal Hand-Poured Scented Candles",
    description: "Hand-poured candles for moments worth remembering.",
    url: "https://starryak.in",
    siteName: "Starry AK",
    images: [
      {
        url: "/images/hero_candle.jpg",
        width: 1200,
        height: 900,
        alt: "Starry AK Artisanal Candle",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} antialiased selection:bg-brand-sand`}
    >
      <body className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#221D1A]">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <SearchModal />
        </CartProvider>
      </body>
    </html>
  );
}
