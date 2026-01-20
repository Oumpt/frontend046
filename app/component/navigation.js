'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Navbar() {
  const [tokenState, setToken] = useState(null);
  const [username, setUsername] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    import('bootstrap/dist/js/bootstrap.bundle.min.js');

    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    
    if (token) {
      setToken(token);
      setUsername(storedUsername || "Admin");
    }
  }, []);

  const handleSignOut = async () => {
    const result = await Swal.fire({
      title: 'ยืนยันการออกจากระบบ?',
      text: "คุณต้องการออกจากเซสชันปัจจุบันใช่หรือไม่",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6e7881',
      confirmButtonText: 'ใช่, ออกจากระบบ',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      setToken(null);
      setUsername("");
      
      await Swal.fire({
        title: 'ออกจากระบบสำเร็จ',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });

      router.push("/login");
    }
  };

  if (!mounted) return null;

  return (
    <nav className="navbar navbar-expand-lg fixed-top"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "18px",
        border: "1px solid rgba(255, 255, 255, 0.25)",
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
        margin: "15px",
        padding: "10px 20px",
        zIndex: 1050
      }}
    >
      <div className="container-fluid">
        <Link href={tokenState ? "/admin/overview" : "/"} className="navbar-brand d-flex align-items-center gap-2" style={{ color: "white", fontWeight: "bold" }}>
          <Image src="/logo.jpg" alt="Logo" width={32} height={32} className="rounded-circle" />
          <span>ADMIN PANEL</span>
        </Link>

        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" style={{ filter: "invert(1)" }}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
            
            <li className="nav-item ms-lg-3">
              <Link className="nav-link text-white" href="/">หน้าแรก</Link>
            </li>

            {tokenState && (
              <>
                {/* ✅ เพิ่มเมนูภาพรวม (Overview) */}
                <li className="nav-item ms-lg-3 border-start border-white border-opacity-25 ps-lg-3">
                  <Link className="nav-link fw-bold" href="/admin/overview" style={{ color: "#80d4ff" }}>
                    <i className="bi bi-speedometer2 me-1"></i> ภาพรวม
                  </Link>
                </li>

                <li className="nav-item ms-lg-3">
                  <Link className="nav-link text-info fw-bold" href="/admin/users">
                    <i className="bi bi-people-fill me-1"></i> จัดการแอดมิน
                  </Link>
                </li>
                <li className="nav-item ms-lg-3">
                  <Link className="nav-link text-warning fw-bold" href="/admin/products">
                    <i className="bi bi-box-seam-fill me-1"></i> คลังสินค้า
                  </Link>
                </li>
                <li className="nav-item ms-lg-3">
                  <Link className="nav-link fw-bold" href="/admin/pos" style={{ color: "#00ffcc" }}>
                    <i className="bi bi-cart-fill me-1"></i> ขายสินค้า (POS)
                  </Link>
                </li>
                <li className="nav-item ms-lg-3">
                  <Link className="nav-link fw-bold" href="/admin/sales-report" style={{ color: "#ff99cc" }}>
                    <i className="bi bi-graph-up-arrow me-1"></i> รายงานยอดขาย
                  </Link>
                </li>
              </>
            )}

            <li className="nav-item ms-lg-3">
              <Link className="nav-link text-white" href="/about">เกี่ยวกับเรา</Link>
            </li>

            {tokenState ? (
              <>
                <li className="nav-item ms-lg-4 text-white d-flex align-items-center mt-2 mt-lg-0">
                  <span className="badge bg-light text-dark px-3 py-2 rounded-pill shadow-sm">
                    <i className="bi bi-person-circle me-2"></i> {username}
                  </span>
                </li>
                <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="btn btn-danger shadow-sm"
                    style={{
                      backgroundColor: "rgba(220, 53, 69, 0.8)",
                      border: "none",
                      borderRadius: "10px",
                      padding: "8px 18px"
                    }}
                  >
                    ออกจากระบบ
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item ms-lg-4 mt-2 mt-lg-0">
                <Link
                  href="/login"
                  className="btn btn-primary shadow-sm"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    border: "1px solid rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "10px",
                    padding: "8px 22px",
                    color: "white"
                  }}
                >
                  เข้าสู่ระบบ
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}