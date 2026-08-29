import type { Metadata } from "next";
import "./globals.css";
import "./flows.css";
import "./demo.css";
import { AuthProvider } from "../lib/auth-context";

export const metadata: Metadata = {
  title: {
    default: "RTI Online | Central Government Right to Information Portal",
    template: "%s | RTI Online"
  },
  description: "Official citizen service portal for filing RTI requests, tracking statutory timelines, filing first appeals, and payment reconciliation.",
  robots: { index: false, follow: false }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;0,6..72,700;1,6..72,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
