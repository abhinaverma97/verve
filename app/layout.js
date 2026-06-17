import "./globals.css";

export const metadata = {
  title: "Verve — Four Channels, One Memory",
  description:
    "Verve is the autonomous AI sales platform that unifies SMS, Voice, Email, and Webchat with one persistent memory. Convert leads faster with AI SDRs that never sleep.",
  keywords: [
    "AI sales",
    "AI SDR",
    "speed to lead",
    "conversational AI",
    "SMS marketing",
    "AI voice calls",
    "lead conversion",
  ],
  openGraph: {
    title: "Verve — Four Channels, One Memory",
    description:
      "Autonomous AI SDRs across SMS, Voice, Email & Webchat with a single persistent memory.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#05060a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
