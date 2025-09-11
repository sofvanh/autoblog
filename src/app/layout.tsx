import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/topBar/TopBar";
import { UserProvider } from "@/components/contexts/UserContext";
import { Inter, Crimson_Text } from 'next/font/google';
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
const crimsonText = Crimson_Text({
  weight: ['400', '600', '700'],
  variable: '--font-crimson-text',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  style: ['italic', 'normal'],
});

export const metadata: Metadata = {
  title: "Autoblog Documentation",
  description: "Autostructures blogging",
  alternates: {
    canonical: "https://autoblog.sofiavanhanen.fi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${crimsonText.variable}`}>
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