import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";

import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import SessionProvider from "@/app/providers/SessionProvider";
import QueryProvider from "@/app/providers/queryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "髙島屋様ポータルサイト",
  description: "髙島屋様ポータルサイト",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <QueryProvider>
        <html lang="en">
          <head>
            <ColorSchemeScript />
          </head>
          <body className={inter.className}>
            <MantineProvider>{children}</MantineProvider>
          </body>
        </html>
      </QueryProvider>
    </SessionProvider>
  );
}
