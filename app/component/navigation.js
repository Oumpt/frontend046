'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Navbar() {
  const [tokenState, setToken] = useState(null);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    import('bootstrap/dist/js/bootstrap.bundle.min.js');

    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");
    
    if (token) {
      setToken(token);
      setUsername(storedUsername || "User");
      setRole(storedRole);
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
      localStorage.removeItem("role");
      setToken(null);
      setUsername("");
      setRole(null);
      
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
        margin: "15px auto",
        maxWidth: "96%",
        padding: "8px 20px",
        zIndex: 1050
      }}
    >
      <div className="container-fluid d-flex justify-content-between"> {/* กระจาย Brand กับ Content ออกจากกัน */}
        
        <Link href={role === "admin" ? "/admin/overview" : "/"} 
              className="navbar-brand d-flex align-items-center gap-2" 
              style={{ color: "white", fontWeight: "bold", fontSize: "1.2rem", flexShrink: 0 }}>
          <Image src="/logo.jpg" alt="Logo" width={32} height={32} className="rounded-circle" />
          <span>{role === "admin" ? "ADMIN" : "MYSTORE"}</span>
        </Link>

        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" style={{ filter: "invert(1)" }}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* ✅ ส่วนนี้คือการทำให้เมนูกระจายตัวเต็มพื้นที่ที่เหลือ */}
          <ul className="navbar-nav w-100 d-flex justify-content-around align-items-center mb-0" 
              style={{ fontSize: "0.9rem", listStyle: "none" }}>
            
            <li className="nav-item">
              <Link className="nav-link text-white" href="/">
                <i className="bi bi-house-door me-1"></i>หน้าแรก
              </Link>
            </li>

            {tokenState && role === "admin" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link fw-bold" href="/admin/overview" style={{ color: "#80d4ff" }}>
                    <i className="bi bi-speedometer2 me-1"></i>ภาพรวม
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-info fw-bold" href="/admin/users">
                    <i className="bi bi-people-fill me-1"></i>สมาชิก
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-warning fw-bold" href="/admin/products">
                    <i className="bi bi-box-seam-fill me-1"></i>คลัง
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-bold" href="/admin/pos" style={{ color: "#00ffcc" }}>
                    <i className="bi bi-cart-fill me-1"></i>POS
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-bold" href="/admin/sales-report" style={{ color: "#ff99cc" }}>
                    <i className="bi bi-graph-up-arrow me-1"></i>รายงาน
                  </Link>
                </li>
              </>
            )}

            {tokenState && role === "staff" && (
                <li className="nav-item">
                    <Link className="nav-link fw-bold" href="/admin/pos" style={{ color: "#00ffcc" }}>
                        <i className="bi bi-cart-fill me-1"></i>ขายสินค้า (POS)
                    </Link>
                </li>
            )}

            <li className="nav-item">
              <Link className="nav-link text-white" href="/about">
                <i className="bi bi-info-circle me-1"></i>เกี่ยวกับเรา
              </Link>
            </li>

            {/* ส่วนขวาสุด: ชื่อผู้ใช้และปุ่มออก */}
            <div className="d-flex align-items-center gap-2 ms-lg-2">
              {tokenState ? (
                <>
                  <span className={`badge px-3 py-2 rounded-pill shadow-sm ${role === 'admin' ? 'bg-primary' : 'bg-light text-dark'}`} style={{ fontSize: "0.75rem" }}>
                    <i className={`bi ${role === 'admin' ? 'bi-shield-check' : 'bi-person-circle'} me-1`}></i> 
                    {username}
                  </span>
                  <button type="button" onClick={handleSignOut} className="btn btn-danger btn-sm rounded-pill"
                    style={{ padding: "4px 10px", border: "none" }}>
                    <i className="bi bi-box-arrow-right"></i>
                  </button>
                </>
              ) : (
                <Link href="/login" className="btn btn-primary btn-sm rounded-pill px-3"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.2)", color: "white", border: "1px solid rgba(255,255,255,0.4)" }}>
                  <i className="bi bi-person-lock me-1"></i>Login
                </Link>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}