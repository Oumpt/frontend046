'use client';
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <style>{`
        ::placeholder {
          color: white !important;
          opacity: 1;
        }
      `}</style>

      <div className="container-fluid mt-5">
        <footer
          className="py-5"
          style={{
            background: '#000',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#fff',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
          }}
        >
          <div className="container px-4">
            <div className="row justify-content-center align-items-center">

              {/* ซ้าย: โลโก้ + คำอธิบาย + Social */}
              <div className="col-12 col-md-4 mb-4">
                <Link href="/" className="d-flex align-items-center text-decoration-none mb-3">
                  <Image
                    src="/logo.jpg"
                    alt="Logo"
                    width={35}
                    height={35}
                    className="me-2 rounded-circle"
                  />
                  <span
                    style={{
                      color: '#fff',
                      fontWeight: '600',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1.25rem',
                    }}
                  >
                    พงอุ้ม กับ อนิเมะของเขา
                  </span>
                </Link>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                  คัดสรรอนิเมะคุณภาพที่น่าติดตาม เพื่อเพิ่มความสนุกและแรงบันดาลใจในทุกวันของคุณ
                </p>
                <div className="d-flex gap-3 mt-3">
                  <a href="#" className="text-white" aria-label="Instagram">
                    <i className="bi bi-instagram fs-5"></i>
                  </a>
                  <a href="#" className="text-white" aria-label="Facebook">
                    <i className="bi bi-facebook fs-5"></i>
                  </a>
                  <a href="#" className="text-white" aria-label="Line">
                    <i className="bi bi-line fs-5"></i>
                  </a>
                </div>
              </div>

              {/* เมนูหลัก */}
              <div className="col-6 col-md-2 mb-4">
                <h5 style={{ color: '#fff' }}>เมนูหลัก</h5>
                <ul className="nav flex-column">
                  {[
                    { label: 'หน้าแรก', path: '/' },
                    { label: 'เกี่ยวกับเรา', path: '/about' },
                    { label: 'บริการระบบ', path: '/service' },
                    { label: 'ติดต่อเรา', path: '/contact' },
                    { label: 'เข้าสู่ระบบ', path: '/login' },
                  ].map((item) => (
                    <li className="nav-item mb-2" key={item.path}>
                      <Link href={item.path} className="nav-link p-0 text-white">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ติดตามข่าวสาร */}
              <div className="col-12 col-md-4 mb-4">
                <form>
                  <h5 style={{ color: '#fff' }}>ติดตามข่าวสาร</h5>
                  <p>รับอัปเดตข่าวใหม่ล่าสุดจากจักรวาลไซเบอร์</p>
                  <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                    <label htmlFor="newsletter1" className="visually-hidden">
                      Email address
                    </label>
                    {/* ✅ เพิ่ม suppressHydrationWarning เพื่อป้องกัน Error จาก Extension */}
                    <input
                      id="newsletter1"
                      type="email"
                      className="form-control"
                      placeholder="Email address"
                      suppressHydrationWarning={true}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        color: '#fff',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                      }}
                    />
                    {/* ✅ เพิ่ม suppressHydrationWarning ที่ปุ่มด้วย */}
                    <button
                      className="btn"
                      type="button"
                      suppressHydrationWarning={true}
                      style={{
                        backgroundColor: '#fff',
                        color: '#000',
                        border: 'none',
                        fontWeight: 'bold',
                      }}
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* เส้นคั่นแนวนอน */}
            <div className="d-flex justify-content-center my-4">
              <div
                style={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                  width: '90%',
                  maxWidth: '1200px',
                }}
              ></div>
            </div>

            {/* แถบล่างสุด */}
            <div
              className="d-flex flex-column flex-sm-row justify-content-between align-items-center py-3"
              style={{ fontSize: '0.8rem' }}
            >
              <p className="mb-2 mb-sm-0 text-center text-sm-start">
                © 2025 Pongthep Corp. All rights reserved.
              </p>

              <ul className="list-unstyled d-flex mb-0 gap-3">
                <li>
                  <Link href="/" className="text-white text-decoration-none">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-white text-decoration-none">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}