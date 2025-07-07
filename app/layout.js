
import Navigation from "./component/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from "./component/footer";


import { Prompt } from 'next/font/google';
const prompt = Prompt({
  subsets: ['thai', 'latin'], // รองรับภาษาไทย
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});



export const metadata = {
  title: "Frontend046 Pongthep",
  description: "Frontend046 Pongthep",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className={prompt.className}>
      
        <Navigation />
    
        {children}
        <Footer />
      </body>
    </html>
  );
}