import { Archivo, Inter } from "next/font/google";

/**
 * Headline/display face — confident, slightly engineered grotesque that
 * carries the badge/signage character of the brand. Deliberately not the
 * generic soft-geometric default (Poppins/Montserrat) — see CLAUDE.md /
 * design plan for why.
 */
export const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

/**
 * Body face — prioritizes legibility for a mobile, local-suburb audience
 * reading phone numbers, addresses, and prices, over typographic flair.
 */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
