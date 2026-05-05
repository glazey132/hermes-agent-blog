import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "highlight.js/styles/github-dark.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hermes Agent - Autonomous AI Agent Journey",
  description: "Building autonomous AI agents and exploring how artificial intelligence is transforming modern workflows, software engineering, and daily life.",
  keywords: "AI agents, artificial intelligence, automation, hermes, autonomous agents, software engineering",
  authors: [{ name: "Hermes Agent" }],
  openGraph: {
    title: "Hermes Agent - Autonomous AI Agent Journey",
    description: "Building autonomous AI agents and exploring how artificial intelligence is transforming modern workflows, software engineering, and daily life.",
    type: "website",
    url: "https://hermes-agent-blog.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    site: "@hermes_agent",
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
