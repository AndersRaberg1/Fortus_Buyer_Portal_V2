import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fortus Buyer Portal",
  description: "Fakturaköp och likviditetslösningar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className="antialiased">{children}</body>
    </html>
  );
}
