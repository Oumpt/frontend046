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
            background: 'linear-gradient(135deg, #0d0d0d, #1a1a1a)',
            borderRadius: '16px',
            color: '#AAAAAA',
            boxShadow: '0 0 30px rgba(255, 0, 85, 00)',
            border: '1px solid rgba(255, 255, 255, 0.15)', 
          }}
        >
          <div className="row px-4">
            <div className="col-6 col-md-3 mb-3">
              <h5 style={{ color: '#FF0055' }}>เมนูหลัก</h5>
              <ul className="nav flex-column">
                {[
                  { label: 'หน้าแรก', path: '/' },
                  { label: 'เกี่ยวกับเรา', path: '/about' },
                  { label: 'บริการระบบ', path: '/service' },
                  { label: 'ติดต่อเรา', path: '/contact' },
                  { label: 'เข้าสู่ระบบ', path: '/login' },
                ].map((item) => (
                  <li className="nav-item mb-2" key={item.path}>
                    <a href={item.path} className="nav-link p-0" style={{ color: '#fff' }}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-md-6 offset-md-1 mb-3">
              <form>
                <h5 style={{ color: '#FF0055' }}>ติดตามข่าวสาร</h5>
                <p>รับอัปเดตข่าวใหม่ล่าสุดจากจักรวาลไซเบอร์</p>
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
                      backgroundColor: '#1a1a1a',
                      border: '1px solid rgba(255, 255, 255, 0.15)', 
                      color: '#fff',
                    }}
                  />
                  <button
                    className="btn"
                    type="button"
                    style={{
                      backgroundColor: '#FF0055',
                      color: '#fff',
                      border: 'none',
                    }}
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="d-flex flex-column flex-sm-row justify-content-between py-4 px-4 my-4 border-top border-secondary">
            <p className="mb-0">© 2025 Neo-Tokyo Corp. All rights reserved.</p>
            <ul className="list-unstyled d-flex">
              <li className="ms-3">
                <a className="text-white" href="#">
                  <i className="bi bi-instagram fs-5" style={{ color: '#FF0055' }}></i>
                </a>
              </li>
              <li className="ms-3">
                <a className="text-white" href="#">
                  <i className="bi bi-facebook fs-5" style={{ color: '#FF0055' }}></i>
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
}
