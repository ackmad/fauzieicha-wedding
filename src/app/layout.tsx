import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://chairunissa-fauzie-wedding.vercel.app'),
  title: {
    default: "Undangan Pernikahan Chairunissa & Fauzie",
    template: "%s | Chairunissa & Fauzie Wedding"
  },
  description: "Bismillah. Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di hari bahagia kami, Chairunissa & Fauzie. 10 Mei 2026. #theFAithfulCHApter",
  keywords: ["Wedding Invitation", "Undangan Pernikahan", "Chairunissa & Fauzie", "Pernikahan Digital", "theFAithfulCHApter"],
  authors: [{ name: "Chairunissa & Fauzie" }],
  openGraph: {
    title: "Undangan Pernikahan Chairunissa & Fauzie",
    description: "Bismillah. Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di hari bahagia kami. 10 Mei 2026.",
    url: "https://chairunissa-fauzie-wedding.vercel.app/",
    siteName: "Undangan Pernikahan Chairunissa & Fauzie",
    images: [
      {
        url: "/og-image.png?v=3",
        width: 1200,
        height: 630,
        alt: "Undangan Pernikahan Chairunissa & Fauzie",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Undangan Pernikahan Chairunissa & Fauzie",
    description: "Bismillah. Kami mengundang Bapak/Ibu/Saudara/i untuk hadir di hari bahagia kami. 10 Mei 2026.",
    images: ["/og-image.png?v=3"],
  },
  icons: {
    icon: "/icons/favicon.png",
    apple: "/icons/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=EB+Garamond:ital,wght@0,400;1,400&family=Jost:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
