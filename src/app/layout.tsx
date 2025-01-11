import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/topBar/TopBar";
import { UserProvider } from "@/components/contexts/UserContext";
import { Inter, Newsreader } from 'next/font/google';
import Footer from "@/components/footer/Footer";

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
      <body suppressHydrationWarning={true} className="min-h-screen flex flex-col">
        <UserProvider>
          <TopBar />
          <main className="flex-grow p-8 flex flex-col justify-center items-center">
            {children}
          </main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}