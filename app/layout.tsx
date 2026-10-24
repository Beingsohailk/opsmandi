import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://opsmandi.vercel.app"),
  title: "OpsMandi | India ka DevOps tools aur freelancers directory",
  description:
    "DevOps tools, cloud services aur freelancers ek jagah. CI/CD, monitoring, IaC aur security tools discover karo.",
  openGraph: {
    title: "OpsMandi",
    description: "India ka DevOps tools aur freelancers directory",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased [color-scheme:dark]`}
    >
      <body
        className="min-h-full flex flex-col bg-neutral-950 text-neutral-100"
        style={{ backgroundColor: "#0a0a0a", color: "#ededed" }}
      >
        {children}
      </body>
    </html>
  );
}