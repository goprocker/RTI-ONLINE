import type { Metadata } from "next";
import "./globals.css";
import "./flows.css";
import "./demo.css";

export const metadata: Metadata = {
  title: {
    default: "RTI Online | Citizen service demonstrator",
    template: "%s | RTI Online"
  },
  description: "A structured frontend demonstrator for RTI information and citizen-service journeys.",
  robots: { index: false, follow: false }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-IN" data-scroll-behavior="smooth"><body>{children}</body></html>;
}
