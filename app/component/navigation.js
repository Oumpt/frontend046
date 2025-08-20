'use client'

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [tokenState, setToken] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    // โหลด Bootstrap JS
    const loadBootstrap = async () => {
      if (typeof window !== 'undefined') {
        await import('bootstrap/dist/js/bootstrap.bundle.min.js');
      }
    };
    loadBootstrap();

    // อ่าน token + username
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    setToken(token);
    setUsername(storedUsername);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setUsername("");
    router.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderRadius: "16px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
        margin: "12px",
        padding: "8px 16px",
      }}
    >
      <div className="container-fluid">
        <Link href="/" className="navbar-brand d-flex align-items-center gap-2" style={{ color: "white" }}>
          <Image src="/bootstrap-logo.svg" alt="Logo" width={30} height={24} className="d-inline-block align-text-top" />
          FrontEnd
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
            <li className="nav-item ms-3">
              <Link className="nav-link active" href="/" style={{ color: "white" }}>หน้าแรก</Link>
            </li>
            <li className="nav-item ms-3">
              <Link className="nav-link" href="/about" style={{ color: "white" }}>เกี่ยวกับเรา</Link>
            </li>
            <li className="nav-item ms-3">
              <Link href="/service" className="nav-link" style={{ color: "white" }}>บริการของเรา</Link>
            </li>
            <li className="nav-item ms-3">
              <Link href="/contact" className="nav-link" style={{ color: "white" }}>ติดต่อเรา</Link>
            </li>

            {tokenState ? (
              <>
                <li className="nav-item ms-4 text-white">
                  <span className="me-2"><i className="bi bi-person-circle"></i> {username}</span>
                </li>
                <li className="nav-item ms-2">
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="btn btn-danger"
                    style={{
                      color: "white",
                      backgroundColor: "rgba(255, 0, 0, 0.3)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      backdropFilter: "blur(6px)",
                      WebkitBackdropFilter: "blur(6px)",
                      borderRadius: "8px",
                      padding: "6px 16px"
                    }}
                  >
                    <i className="bi bi-box-arrow-right"></i> ออกจากระบบ
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item ms-4">
                <Link
                  href="/login"
                  className="btn btn-primary"
                  role="button"
                  style={{
                    color: "white",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                    borderRadius: "8px",
                    padding: "6px 16px"
                  }}
                >
                  <i className="bi bi-box-arrow-in-right"></i> เข้าสู่ระบบ
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
