import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Behavior Adoption Stack — Diagnostic Tool",
  description: "A diagnostic framework for why users don't engage with programs built for them. Rate each layer, identify barriers, plan interventions.",
  openGraph: {
    title: "Behavior Adoption Stack — Diagnostic Tool",
    description: "A diagnostic framework for why users don't engage with programs built for them.",
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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}