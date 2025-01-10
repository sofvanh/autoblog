import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/topBar/TopBar";
import { UserProvider } from "@/components/contexts/UserContext";
import { Inter, Newsreader } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  fallback: ['system-ui', 'arial'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});
const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  style: ['italic', 'normal'],
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
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
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