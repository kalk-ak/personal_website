import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Orbitron } from "next/font/google";
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
  title: "Kaleb Aklilu | ML & Robotics Engineer",
  description:
    "Machine Learning & Robotics Engineer building intelligent systems at the frontier of Embodied AI, automation, and scalable software.",
  keywords: [
    "Machine Learning",
    "Robotics",
    "Embodied AI",
    "Software Engineer",
    "Python",
    "ROS2",
    "Deep Learning",
  ],
  authors: [{ name: "Kaleb Aklilu" }],
  openGraph: {
    title: "Kaleb Aklilu | ML & Robotics Engineer",
    description:
      "Building intelligent systems at the frontier of Embodied AI and automation.",
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
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${orbitron.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-[#e2e8f0]">
        {children}
      </body>
    </html>
  );
}
