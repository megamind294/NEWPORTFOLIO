import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Rinkle Sharma — Software Engineer & React Developer",
  description: "Software engineer in Kraków with 3+ years of React, TypeScript, Node.js, cloud, and AI product experience.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
