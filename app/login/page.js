'use client';

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loadingRedirect, setLoadingRedirect] = useState(false);
  const router = useRouter();

  // 🛡️ ป้องกันผู้ใช้ที่ล็อกอินแล้วไม่ให้เข้า /login อีก
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.replace('/admin/users'); // หรือหน้าอื่นที่คุณต้องการ
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'กรุณากรอกชื่อผู้ใช้';
    if (!formData.password) newErrors.password = 'กรุณากรอกรหัสผ่าน';
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
      const res = await fetch('https://backend-nextjs-virid.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', formData.username);

        await Swal.fire({
          icon: 'success',
          title: '<h3>ล็อกอินสำเร็จ!</h3>',
          text: `ยินดีต้อนรับคุณ ${formData.username}`,
          showConfirmButton: false,
          timer: 2000,
        });

        setLoadingRedirect(true); // แสดงหน้ารอโหลดเต็มจอ

        setTimeout(() => {
          window.location.href = "/admin/users";
        }, 500);
      } else {
        await Swal.fire({
          icon: 'warning',
          title: '<h3>ล็อกอินไม่สำเร็จ!</h3>',
          text: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
          showConfirmButton: false,
          timer: 2000,
        });
        router.push('/login');
      }
    } catch (error) {
      console.error('Login error:', error);
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้',
      });
    }
  };

  // Loader เต็มจอระหว่าง redirect
  if (loadingRedirect) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
        }}
      >
        <div
          className="loader ease-linear rounded-full border-8 border-t-8 border-gray-300 h-16 w-16 mb-4"
          style={{ borderTopColor: '#3b82f6', animation: 'spin 1s linear infinite' }}
        ></div>
        <h2 style={{ fontWeight: 'bold', color: '#333' }}>กำลังโหลด...</h2>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      className="d-flex justify-content-center mt-5"
      style={{ maxWidth: '400px', padding: '50px', margin: '100px auto' }}
    >
      <form
        onSubmit={handleSubmit}
        className="p-4 border border-dark rounded"
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundImage:
            'url("https://i.pinimg.com/736x/34/06/5a/34065a361094df5e01063f23e4c7d83c.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.6)',
          borderRadius: '20px',
        }}
      >
        <h1 className="text-center mb-4" style={{ fontWeight: 'bold' }}>
          เข้าสู่ระบบ
        </h1>

        <div className="mb-3 text-start">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className={`form-control ${errors.username ? 'border border-danger' : ''}`}
            value={formData.username}
            onChange={handleChange}
            placeholder="กรุณาใส่ชื่อของท่าน"
          />
          {errors.username && <div className="text-danger">{errors.username}</div>}
        </div>

        <div className="mb-3 text-start">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className={`form-control ${errors.password ? 'border border-danger' : ''}`}
            value={formData.password}
            onChange={handleChange}
            placeholder="กรุณาใส่รหัสผ่านของท่าน"
          />
          {errors.password && <div className="text-danger">{errors.password}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          เข้าสู่ระบบ
        </button>

        <div className="form-check mb-3 text-start mt-3">
          <input className="form-check-input" type="checkbox" id="rememberMe" />
          <label className="form-check-label" htmlFor="rememberMe">
            จดจำฉันไว้
          </label>
        </div>

        <div className="text-center" style={{ fontSize: '0.9rem' }}>
          <Link href="/register" className="me-3" style={{ color: '#fff' }}>
            สมัครสมาชิก
          </Link>{' '}
          |{' '}
          <Link href="/register" className="ms-3" style={{ color: '#fff' }}>
            หากลืมรหัสผ่าน
          </Link>
        </div>
      </form>
    </div>
  );
}
