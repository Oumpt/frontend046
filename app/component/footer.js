'use client';
import Link from "next/link";

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
          className="py-4"
          style={{
            background: '#000',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#fff',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
          }}
        >
          <div className="row px-4">

            {/* ซ้าย: การแนะนำอนิเมะ + คำอธิบาย + social */}
            <div className="col-12 col-md-4 mb-3">
              <Link href="/" className="d-flex align-items-center text-decoration-none mb-3">
                <img
                  src="/logo.jpg"  // เปลี่ยนภาพโลโก้ตามต้องการ
                  alt="Logo"
                  width="35"
                  height="35"
                  className="me-2 rounded-circle"
                />
                <span
                  style={{
                    color: '#ffff',
                    fontWeight: '600',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.25rem',
                  }}
                >
                  พงอุ้ม กับ อนิเมะของเขา
                </span>
              </Link>
              <p className="" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
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
            <div className="col-6 col-md-2 mb-3">
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

            {/* ส่วนบริการ */}
            <div className="col-6 col-md-3 mb-3">
              <h5 style={{ color: '#fff' }}>ส่วนบริการ</h5>
              <ul className="nav flex-column">
                {[
                  { label: 'แนะนำอนิเมะ', path: '/anime-recommendations' },
                  { label: 'รีวิวอนิเมะ', path: '/anime-reviews' },
                  { label: 'อันดับอนิเมะ', path: '/anime-ranking' },
                  { label: 'ข่าวสารอนิเมะ', path: '/anime-news' },
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
            <div className="col-12 col-md-3 mb-3">
              <form>
                <h5 style={{ color: '#fff' }}>ติดตามข่าวสาร</h5>
                <p style={{ color: '#fff' }}>
                  รับอัปเดตข่าวใหม่ล่าสุดจากจักรวาลไซเบอร์
                </p>
                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                  <label htmlFor="newsletter1" className="visually-hidden">
                    Email address
                  </label>
                  <input
                    id="newsletter1"
                    type="email"
                    className="form-control"
                    placeholder="Email address"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: '#fff',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                  />
                  <button
                    className="btn"
                    type="button"
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

          <div
            className="d-flex flex-column flex-sm-row justify-content-between align-items-center py-4 px-4 my-4 border-top border-light"
            style={{ fontSize: '0.8rem' }}
          >
            <p className="mb-0 text-center text-sm-start" style={{ color: '#fff' }}>
              © 2025 Pongthep Corp. All rights reserved.
            </p>

            <ul className="list-unstyled d-flex mb-0 gap-3">
              <li>
                <Link href="/privacy-policy" className="text-white text-decoration-none">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-white text-decoration-none">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
}
