import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Orbitron } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Kaleb Aklilu | ML & Systems Engineer",
  description:
    "Machine Learning & Systems Engineer building ML pipelines, backend infrastructure, and automation that scales.",
  keywords: [
    "Machine Learning",
    "Systems Engineering",
    "Embodied AI",
    "Software Engineer",
    "Python",
    "ROS2",
    "Deep Learning",
  ],
  authors: [{ name: "Kaleb Aklilu" }],
  openGraph: {
    title: "Kaleb Aklilu | ML & Systems Engineer",
    description:
      "Building ML pipelines, backend infrastructure, and automation that scales.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // Keeps the smooth scroll for in-page anchors but jumps instantly to the
      // top on route changes, so a new page never visibly scrolls up.
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${orbitron.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-[#e2e8f0]">
        <Nav />
        <main className="flex flex-col flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
