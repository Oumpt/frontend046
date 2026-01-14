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
    <html lang="th" suppressHydrationWarning>
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
      {/* ✅ ปรับ body ให้เป็น Flexbox และสูงเต็มหน้าจอเสมอ */}
      <body 
        className={`${prompt.className} d-flex flex-column min-vh-100`} 
        style={{ 
          backgroundImage : 'url(/free.png)',
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed' // ✅ ให้พื้นหลังนิ่งเวลาเลื่อน
        }}
        suppressHydrationWarning
      >
        <Navigation />

        {/* ✅ หุ้ม children ด้วย main และใช้ flex-grow-1 เพื่อดัน Footer ลงล่างสุด */}
        <main className="flex-grow-1">
          {children}
        </main>

        <Footer />

        <BackgroundMusic />
      </body>
    </html>
  );
}