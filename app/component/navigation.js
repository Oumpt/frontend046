//import ใน /app/layout.js
'use client'

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";


export default function Navbar() {
    useEffect(() => {
    const loadBootstrap = async () => {
      if (typeof window !== 'undefined') {
        await import('bootstrap/dist/js/bootstrap.bundle.min.js');
      }
    };
    
    loadBootstrap();
  }, []);
  return (
<nav className="navbar navbar-expand-lg fixed-top " style={{ backdropFilter:"blur(13px)" , backgroundColor: "rgb(0,0,0,0)"

    }}>
  <div className="container-fluid">
  <Link href="/" className="navbar-brand d-flex align-items-center gap-2" style={{color:"white"}}><img src="/bootstrap-logo.svg" alt="Logo" width={30} height={24} className="d-inline-block align-text-top" /> FrontEnd</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
        <li className="nav-item ms-3">
          <Link className="nav-link active" aria-current="page" href="/" style={{color:"white"}}>หน้าแรก</Link>
        </li>
        <li className="nav-item ms-3">
          <Link className="nav-link" href="/about" style={{color:"white"}}>เกี่ยวกับเรา</Link>
        </li>
        <li className="nav-item ms-3">
          <Link href="/service" className="nav-link" aria-disabled="true" style={{color:"white"}}>บริการของเรา</Link>
        </li>
        <li className="nav-item ms-3">
          <Link href="/contact" className="nav-link" aria-disabled="true" style={{color:"white"}}>ติดต่อเรา</Link>
        </li>
            <li className="nav-item ms-4">
              <a
                href="/login"
                className="btn btn-primary"
                role="button"
                style={{ color: "white" }}
              >
                เข้าสู่ระบบ
              </a>
            </li>
      </ul>

    

    </div>
  </div>
</nav>
  );
}