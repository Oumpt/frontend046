'use client';
import { useEffect, useState } from 'react';
import Image from "next/image";

export default function Carousel() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // โหลด Bootstrap JS
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
    setMounted(true);
  }, []);

  // ป้องกันปัญหา Hydration mismatch เบื้องต้นด้วยการรอให้ Mounted ก่อน
  if (!mounted) return null;

  return (
    <div id="carouselExample" className="carousel slide carousel-fade" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <Image src="/saka111.jpg" className="d-block w-100 object-fit-cover" alt="Slide 1" width={1920} height={1080} style={{ height: '100vh', width: '100vw' }} priority />
        </div>
        <div className="carousel-item">
          <Image src="/saka7.jpg" className="d-block w-100 object-fit-cover" alt="Slide 2" width={1920} height={1080} style={{ height: '100vh', width: '100vw' }} />
        </div>
        <div className="carousel-item">
          <Image src="/saka8.jpg" className="d-block w-100 object-fit-cover" alt="Slide 3" width={1920} height={1080} style={{ height: '100vh', width: '100vw' }} />
        </div>
      </div>
      
      {/* ⚠️ เพิ่ม suppressHydrationWarning เพื่อป้องกัน Error จาก Extension ใน Browser */}
      <button 
        className="carousel-control-prev" 
        type="button" 
        data-bs-target="#carouselExample" 
        data-bs-slide="prev"
        suppressHydrationWarning
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>

      <button 
        className="carousel-control-next" 
        type="button" 
        data-bs-target="#carouselExample" 
        data-bs-slide="next"
        suppressHydrationWarning
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}