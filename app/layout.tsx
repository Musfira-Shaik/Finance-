import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sage | Dynamic Budget Engine",
  description: "An explainable AI budget allocation command center."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
