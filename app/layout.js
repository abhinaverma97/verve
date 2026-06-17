import "./globals.css";
import { Inter, Space_Grotesk } from "next/font/google";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  title: "Verve — One memory across every channel",
  description:
    "Verve runs SMS, voice, email and webchat from a single persistent memory. When a lead drops, it follows up on another channel and keeps the same conversation going.",
  keywords: [
    "AI sales",
    "AI SDR",
    "speed to lead",
    "conversational AI",
    "omnichannel outreach",
    "lead conversion",
  ],
  openGraph: {
    title: "Verve — One memory across every channel",
    description:
      "Autonomous AI reps across SMS, voice, email and webchat, sharing a single persistent memory.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0b0b0f",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="grain">{children}</body>
    </html>
  );
}
