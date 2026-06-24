import React from "react";

import "./styles/common.scss";
import { AppProvider } from "./context/AppContext";
import LayoutShell from "./components/LayoutShell/LayoutShell";

// Note: This is a Server Component (no 'use client') so Next.js metadata
// export works normally. All client-side state lives in AppProvider / LayoutShell.

export const metadata = {
  title: "BD-MART — Neighbourhood Essentials, Anytime Nearby",
  description:
    "BD-MART is your trusted neighbourhood convenience shop for daily grocery, snacks, baby care, personal care, cafe and more. Fast, clean, affordable.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Inter:ital,wght@0,400;0,500;0,600;0,700;0,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppProvider>
          <LayoutShell>{children}</LayoutShell>
        </AppProvider>
      </body>
    </html>
  );
}
