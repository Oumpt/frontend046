"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loadingRedirect, setLoadingRedirect] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // ✅ ปรับปรุง: ถ้ามี Token และเป็น Admin ถึงจะส่งไปหน้า Overview
    if (token && role === "admin") {
      router.replace("/admin/overview");
    } else if (token) {
      router.replace("/"); // ถ้าเป็น Staff ให้ไปหน้าแรก
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "กรุณากรอกชื่อผู้ใช้";
    if (!formData.password) newErrors.password = "กรุณากรอกรหัสผ่าน";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const apiUrl = "https://backend046.vercel.app/api/auth/login";

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success && data.token) {
        // ✅ เก็บข้อมูลลง LocalStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("role", data.user.role);

        await Swal.fire({
          icon: "success",
          title: "ล็อกอินสำเร็จ!",
          text: `ยินดีต้อนรับคุณ ${data.user.username}`,
          showConfirmButton: false,
          timer: 1500,
        });

        setLoadingRedirect(true);

        // ✅ แยกทางเดิน (Redirect) ตามสิทธิ์
        setTimeout(() => {
          if (data.user.role === "admin") {
            window.location.href = "/admin/overview";
          } else {
            window.location.href = "/"; // Staff ไปหน้าแรก
          }
        }, 500);
      } else {
        await Swal.fire({
          icon: "warning",
          title: "ล็อกอินไม่สำเร็จ!",
          text: data.error || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
      });
    }
  };

  if (!mounted) return null;

  if (loadingRedirect) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
        }}
      >
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        ></div>
        <h2 className="mt-3 text-white">กำลังพาคุณเข้าสู่ระบบ...</h2>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 px-3">
      <form
        onSubmit={handleSubmit}
        suppressHydrationWarning
        className="p-4 shadow-lg text-white"
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://i.pinimg.com/736x/34/06/5a/34065a361094df5e01063f23e4c7d83c.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "24px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <h1 className="text-center mb-4 fw-bold">เข้าสู่ระบบ</h1>

        <div className="mb-3 text-start">
          <label htmlFor="username" className="form-label small">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className={`form-control bg-transparent text-white ${
              errors.username ? "border-danger" : "border-white-50"
            }`}
            value={formData.username}
            onChange={handleChange}
            placeholder="ชื่อผู้ใช้ของคุณ"
            style={{ border: "1px solid rgba(255,255,255,0.3)" }}
          />
          {errors.username && (
            <div className="text-danger small mt-1">{errors.username}</div>
          )}
        </div>

        <div className="mb-3 text-start">
          <label htmlFor="password" className="form-label small">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className={`form-control bg-transparent text-white ${
              errors.password ? "border-danger" : "border-white-50"
            }`}
            value={formData.password}
            onChange={handleChange}
            placeholder="รหัสผ่านของคุณ"
            style={{ border: "1px solid rgba(255,255,255,0.3)" }}
          />
          {errors.password && (
            <div className="text-danger small mt-1">{errors.password}</div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 fw-bold rounded-pill py-2 shadow-sm mb-3"
          style={{
            background: "linear-gradient(45deg, #3b82f6, #2563eb)",
            border: "none",
          }}
        >
          🚀 เข้าสู่ระบบ
        </button>

        <div className="d-flex justify-content-between mb-4 small">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="rememberMe"
            />
            <label className="form-check-label" htmlFor="rememberMe">
              จดจำฉันไว้
            </label>
          </div>
          <Link href="/register" className="text-white-50 text-decoration-none">
            ลืมรหัสผ่าน?
          </Link>
        </div>

        <div className="text-center small pt-2 border-top border-white-25">
          ยังไม่มีบัญชี?{" "}
          <Link
            href="/register"
            className="fw-bold text-white text-decoration-none"
          >
            สมัครสมาชิก
          </Link>
        </div>
      </form>
    </div>
  );
}