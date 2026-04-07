import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://fauzieicha-wedding.vercel.app'),
  title: "The Wedding of Chairunissa & Fauzie",
  description: "Bismillah. Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di hari bahagia kami.",
  keywords: ["Wedding", "Undangan Digital", "Chairunissa & Fauzie", "Pernikahan"],
  authors: [{ name: "Chairunissa & Fauzie" }],
  openGraph: {
    title: "The Wedding of Chairunissa & Fauzie",
    description: "Bismillah. Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di hari bahagia kami.",
    url: "https://fauzieicha-wedding.vercel.app/",
    siteName: "Chairunissa & Fauzie Wedding",
    images: [
      {
        url: "/og-image.jpg?v=2",
        width: 1200,
        height: 630,
        alt: "Invitation to The Wedding of Chairunissa & Fauzie",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Wedding of Chairunissa & Fauzie",
    description: "Bismillah. Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di hari bahagia kami.",
    images: ["/og-image.jpg?v=2"],
  },
  icons: {
    icon: "/icons/favicon.png",
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
