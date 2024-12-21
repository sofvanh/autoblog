import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/topBar/TopBar";
import { UserProvider } from "@/components/contexts/UserContext";
import { Inter, Newsreader, Patrick_Hand_SC } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
});
const patrickHandSC = Patrick_Hand_SC({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-patrick-hand-sc',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Autoblog",
  description: "Your personal blog with AI assistance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${patrickHandSC.variable} ${inter.variable} ${newsreader.variable}`}>
      <body suppressHydrationWarning={true}>
        <UserProvider>
          <TopBar />
          <div className="p-8 flex flex-col justify-center items-center">
            {children}
          </div>
        </UserProvider>
      </body>
    </html>
  );
}