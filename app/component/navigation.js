//import ใน /app/layout.js

import Link from "next/link";
import Image from "next/image";


export default function Navbar() {
  return (
<nav className="navbar navbar-expand-lg fixed-top " style={{ backdropFilter:"blur(13px)" , backgroundColor: "rgb(0,0,0,0)"

    }}>
  <div className="container-fluid">
  <Link href="/" className="navbar-brand d-flex align-items-center gap-2" style={{color:"white"}}><img src="/bootstrap-logo.svg" alt="Logo" width={30} height={24} className="d-inline-block align-text-top" /> FrontEnd</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" href="/" style={{color:"white"}}>หน้าแรก</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/about" style={{color:"white"}}>เกี่ยวกับเรา</Link>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" href="/service" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"white"}}>
            บริการของเรา
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" href="/service">ติดต่อเรา</Link></li>
            <li><Link className="dropdown-item" href="/service">ติดต่อ ด้านอื่นๆ</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link className="dropdown-item" href="/service">สอบถามเกียวกับปัญหา</Link></li>
          </ul>
        </li>
        <li className="nav-item">
          <Link href="/contact" className="nav-link" aria-disabled="true" style={{color:"white"}}>ติดต่อเรา</Link>
        </li>
      </ul>

      <div className="ms-2">    
          <a href="\login" className="btn btn-primary " tabIndex={-1} role="button" style={{color:"white"}}>เข้าสู่ระบบ</a></div>

    </div>
  </div>
</nav>
  );
}