'use client'

export default function Footer() {
  return (
    <div className="container-fluid mt-5">
      <footer
        className="py-5"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div className="row px-4">
          <div className="col-6 col-md-3 mb-3">
            <h5>เมนูหลัก</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0 text-white">หน้าแรก</a>
              </li>
              <li className="nav-item mb-2">
                <a href="/about" className="nav-link p-0 text-white">เกี่ยวกับเรา</a>
              </li>
              <li className="nav-item mb-2">
                <a href="/service" className="nav-link p-0 text-white">บริการระบบ</a>
              </li>
              <li className="nav-item mb-2">
                <a href="/contact" className="nav-link p-0 text-white">ติดต่อเรา</a>
              </li>
              <li className="nav-item mb-2">
                <a href="/login" className="nav-link p-0 text-white">เข้าสู่ระบบ</a>
              </li>
            </ul>
          </div>

          <div className="col-md-6 offset-md-1 mb-3">
            <form>
              <h5>ติดตามข่าวสาร</h5>
              <p>สมัครรับข่าวสารและอัปเดตจากเราได้ทุกเดือน</p>
              <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                <input
                  id="newsletter1"
                  type="email"
                  className="form-control"
                  placeholder="Email address"
                />
                <button className="btn btn-outline-light" type="button">Subscribe</button>
              </div>
            </form>
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between py-4 px-4 my-4 border-top border-light">
          <p className="mb-0">© 2025 Company, Inc. All rights reserved.</p>
          <ul className="list-unstyled d-flex">
            <li className="ms-3">
              <a className="text-white" href="#"><i className="bi bi-instagram fs-5"></i></a>
            </li>
            <li className="ms-3">
              <a className="text-white" href="#"><i className="bi bi-facebook fs-5"></i></a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
