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
          <div className="col-6 col-md-2 mb-3">
            <h5>Section</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">Home</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">Features</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">Pricing</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">FAQs</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">About</a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-2 mb-3">
            <h5>More</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">Blog</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">Careers</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">Support</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">Privacy</a>
              </li>
            </ul>
          </div>

          <div className="col-md-5 offset-md-1 mb-3">
            <form>
              <h5>Subscribe to our newsletter</h5>
              <p>Monthly digest of what's new and exciting from us.</p>
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
