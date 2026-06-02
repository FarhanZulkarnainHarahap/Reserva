import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raserva | Dining, thoughtfully reserved",
  description: "Reserve a table and pre-order your favorite dishes at Raserva."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
