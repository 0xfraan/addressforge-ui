import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "addressforge",
  description: "Forge Ethereum addresses with custom patterns!",
  metadataBase: new URL("https://addressforge.xyz/"),
  openGraph: {
    title: "addressforge",
    description: "Forge Ethereum addresses with custom patterns!",
    url: "https://addressforge.xyz/",
    siteName: "addressforge",
    images: [
      {
        url: "https://i.postimg.cc/sgj3ZRgn/photo-2024-12-02-13-14-04.jpg",
        width: 320,
        height: 100,
        alt: "AddressForge - Ethereum Vanity Address Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
