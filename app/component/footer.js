'use client';

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
          <div className="row px-4">
            <div className="col-6 col-md-3 mb-3">
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
                    <a href={item.path} className="nav-link p-0 text-white">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-md-6 offset-md-1 mb-3">
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

          <div className="d-flex flex-column flex-sm-row justify-content-between py-4 px-4 my-4 border-top border-light">
            <p className="mb-0" style={{ color: '#fff' }}>
              © 2025 Pongthep Corp. All rights reserved.
            </p>
            <ul className="list-unstyled d-flex">
              <li className="ms-3">
                <a className="text-white" href="#">
                  <i className="bi bi-instagram fs-5" style={{ color: '#fff' }}></i>
                </a>
              </li>
              <li className="ms-3">
                <a className="text-white" href="#">
                  <i className="bi bi-facebook fs-5" style={{ color: '#fff' }}></i>
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
}
