import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/TopBar";
import { UserProvider } from "@/components/UserContext";
import { Inter, Newsreader, Patrick_Hand_SC } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const newsreader = Newsreader({ subsets: ['latin'], variable: '--font-newsreader' });
const patrickHandSC = Patrick_Hand_SC({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-patrick-hand-sc',
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
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className={`${patrickHandSC.variable} ${inter.variable} ${newsreader.variable}`}>
          <UserProvider>
            <TopBar />
            <div className="p-8 flex flex-col justify-center items-center">
              {children}
            </div>
          </UserProvider>
        </div>
      </body>
    </html>
  );
}