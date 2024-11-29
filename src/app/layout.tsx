import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/TopBar";
import { UserProvider } from "@/components/UserContext";
import { Inter, Newsreader, Patrick_Hand_SC } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const newsreader = Newsreader({ subsets: ['latin'] });
const patrickHandSC = Patrick_Hand_SC({
  subsets: ['latin'],
  weight: ['400']
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
      <body className={`${inter.className} antialiased`}>
        <UserProvider>
          <TopBar />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}