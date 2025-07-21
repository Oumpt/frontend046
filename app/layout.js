'use client'
import Navigation from "./component/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from './component/footer';


import { Prompt } from 'next/font/google';
const prompt = Prompt({
  subsets: ['thai', 'latin'], // รองรับภาษาไทย
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});


export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <title>FrontEnd046 Pongthep</title>
        <meta name="viewport saturate-200" content="device-width,"/>  
                      <style jsx global>{`
        /* ซ่อน scrollbar สำหรับ Webkit browsers (Chrome, Safari, Edge) */
        ::-webkit-scrollbar {
          display: none;
        }
        
        /* ซ่อน scrollbar สำหรับ Firefox */
        html {
          scrollbar-width: none;
        }
        
        /* ซ่อน scrollbar แต่ยังสามารถเลื่อนได้ */
        body {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
          scrollbar-width: none;  /* Firefox */
        }
        
        body::-webkit-scrollbar { 
          display: none;  /* Safari and Chrome */
        }
      `}</style>  
      </head>
      <body className={prompt.className} style={{backgroundColor: "gray"}}>

        <Navigation />

          {children}

      

       <Footer />
      </body>
    </html>
  );
}