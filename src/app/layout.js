import "./globals.css";
import { Playfair_Display, Inter } from 'next/font/google';
import Navbar from "@/components/Navbar";

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['700', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600'],
});

export const metadata = {
  title: "CurvBooks",
  description: "Your online book store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-[#F9F8F6]`}>
        <Navbar className="text-[#1A1A1B]" />
        {children}
      </body>
    </html>
  );
}