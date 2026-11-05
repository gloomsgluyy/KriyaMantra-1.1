import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Kriya Mantra — Marketing AI untuk Perajin Bali",
  description:
    "Kriya Mantra mengubah foto dan cerita produk perajin tradisional Bali menjadi poster unik, caption bilingual Indonesia-Inggris, dan jadwal posting Instagram.",
  icons: {
    icon: "/assets/brand/logo-footer.svg",
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
        {/* Preload exact Host Grotesk font from design-refference */}
        <link
          rel="preload"
          href="/fonts/hostgrotesk-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Host+Grotesk:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen bg-[#ffffff] text-[#292524] selection:bg-[#f59e0b] selection:text-[#292524]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
