'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const router = useRouter();

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

    // TODO: แทนที่ด้วย API login จริง
    if (formData.username === 'admin' && formData.password === '1234') {
      // สมมติ login สำเร็จ
      localStorage.setItem('token', 'fake-jwt-token');
      localStorage.setItem('username', formData.username);

      await Swal.fire({
        icon: 'success',
        title: 'ล็อกอินสำเร็จ',
        text: `ยินดีต้อนรับคุณ ${formData.username}`,
        confirmButtonText: 'ตกลง',
      });

      router.push('/admin/users');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'ล็อกอินไม่สำเร็จ',
        text: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
      });
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5" style={{ maxWidth: '400px', padding: '50px', margin: '100px auto' }}>
      <form
        onSubmit={handleSubmit}
        className="p-4 border border-dark rounded"
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundImage: 'url("https://i.pinimg.com/736x/34/06/5a/34065a361094df5e01063f23e4c7d83c.jpg")',
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
          <a href="/register" className="me-3" style={{ color: '#fff' }}>
            สมัครสมาชิก
          </a>{' '}
          |{' '}
          <a href="/forgot-password" className="ms-3" style={{ color: '#fff' }}>
            หากลืมรหัสผ่าน
          </a>
        </div>
      </form>
    </div>
  );
}
