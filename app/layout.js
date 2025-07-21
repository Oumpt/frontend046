'use client'
import Navigation from "./component/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from './component/footer';
import BackgroundMusic from "./component/backgroundmusic";

import { Prompt } from 'next/font/google';
const prompt = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <title>FrontEnd046 Pongthep</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style jsx global>{`
          /* ซ่อน scrollbar สำหรับ Webkit browsers (Chrome, Safari, Edge) */
          ::-webkit-scrollbar {
            display: none;
          }
          html {
            scrollbar-width: none;
          }
          body {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          body::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </head>
      <body className={prompt.className} style={{ backgroundColor: 'gray' }}>
        <Navigation />

        {children}

        <Footer />

        {/* วางปุ่มเพลงไว้ข้างล่างสุด */}
        <BackgroundMusic />
      </body>
    </html>
  );
}
