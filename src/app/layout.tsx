import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://fauzieicha-wedding.vercel.app'),
  title: "The Wedding of Fauzie & Icha",
  description: "Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir dan memberikan doa restu pada acara pernikahan kami.",
  openGraph: {
    title: "The Wedding of Fauzie & Icha",
    description: "Bismillah. Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada pernikahan kami.",
    url: "https://fauzieicha-wedding.vercel.app/",
    siteName: "Undangan Pernikahan Fauzie & Icha",
    images: [
      {
        url: "/backgrounds/hero-background.png",
        width: 1200,
        height: 630,
        alt: "The Wedding of Fauzie & Icha",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Wedding of Fauzie & Icha",
    description: "Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir pada acara pernikahan kami.",
    images: ["/backgrounds/hero-background.png"],
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
