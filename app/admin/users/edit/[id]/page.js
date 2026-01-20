'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function EditUserPage() {
  const router = useRouter();
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false); // ✅ ยามเช็คสิทธิ์

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    fullname: '',
    username: '',
    password: '', 
    status: 'active',
    role: 'staff',
  });

  useEffect(() => {
    // 🔒 1. ด่านกั้นสิทธิ์ (ห้าม Staff ยุ่ง)
    const currentRole = localStorage.getItem('role');
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    if (currentRole !== 'admin') {
      Swal.fire({
        icon: 'error',
        title: 'ระงับการเข้าถึง',
        text: 'คุณไม่มีสิทธิ์ในการแก้ไขข้อมูลผู้ใช้งาน',
        confirmButtonColor: '#d33',
      }).then(() => {
        router.push('/'); // ดีดกลับหน้าหลัก
      });
      return;
    }

    setIsAuthorized(true); // ✅ สิทธิ์ผ่าน

    // 2. ดึงข้อมูลสมาชิกมาแสดง
    async function fetchUser() {
      try {
        const apiUrl = 'https://backend046.vercel.app/api/users';
        const res = await fetch(`${apiUrl}/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (res.status === 401 || res.status === 403) {
          router.push('/login');
          return;
        }

        const data = await res.json();
        const user = Array.isArray(data) ? data[0] : data;

        if (user) {
          setFormData({
            firstname: user.firstname || '',
            lastname: user.lastname || '',
            fullname: user.fullname || '',
            username: user.username || '',
            password: '', 
            status: user.status || 'active',
            role: user.role || 'staff',
          });
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchUser();
  }, [id, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const apiUrl = `https://backend046.vercel.app/api/users/${id}`;
      
      const res = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        await Swal.fire({
          icon: 'success',
          title: 'อัปเดตข้อมูลสำเร็จ!',
          timer: 1500,
          showConfirmButton: false,
        });
        router.push('/admin/users');
      } else {
        throw new Error(result.error || 'ไม่สามารถบันทึกข้อมูลได้');
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'เกิดข้อผิดพลาด', text: error.message });
    }
  };

  // ✅ ถ้ากำลังโหลดหรือไม่มีสิทธิ์ ห้ามเรนเดอร์เนื้อหา
  if (loading || !isAuthorized) return null;

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center" 
          style={{ padding: '20px' }}>
      
      <form onSubmit={handleSubmit} className="p-4" style={{ 
          width: '100%', 
          maxWidth: '420px', 
          backgroundColor: 'rgba(0, 0, 0, 0.3)', 
          border: '1px solid rgba(255, 255, 255, 0.1)', 
          borderRadius: '24px', 
          backdropFilter: 'blur(8px)', 
          color: '#fff',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
        }}>
        
        <h2 className="text-center mb-4 fw-bold">แก้ไขสมาชิก #{id}</h2>

        <div className="mb-3">
          <label className="form-label small">ชื่อ (Firstname)</label>
          <input type="text" name="firstname" 
            className="form-control bg-transparent text-white border-white-50" 
            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
            value={formData.firstname} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label small">นามสกุล (Lastname)</label>
          <input type="text" name="lastname" 
            className="form-control bg-transparent text-white border-white-50" 
            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
            value={formData.lastname} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label small">ชื่อเต็ม (Fullname)</label>
          <input type="text" name="fullname" 
            className="form-control bg-transparent text-white border-white-50" 
            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
            value={formData.fullname} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label small">Username</label>
          <input type="text" name="username" 
            className="form-control bg-transparent text-white border-white-50" 
            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
            value={formData.username} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label small">ระดับสิทธิ์การใช้งาน (Role)</label>
          <select name="role" 
            className="form-select bg-dark text-white border-white-50" 
            style={{ border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(0,0,0,0.5)' }}
            value={formData.role} onChange={handleChange}>
            <option value="staff">Staff (พนักงาน)</option>
            <option value="admin">Admin (ผู้ดูแลระบบ)</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="form-label small">รหัสผ่านใหม่ (ถ้าไม่เปลี่ยนให้เว้นว่าง)</label>
          <input type="password" name="password" 
            className="form-control bg-transparent text-white border-white-50" 
            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
            value={formData.password} onChange={handleChange} placeholder="••••••••" />
        </div>

        <button type="submit" className="btn btn-primary w-100 fw-bold rounded-pill" 
                style={{ background: 'linear-gradient(45deg, #3b82f6, #2563eb)', border: 'none', padding: '12px' }}>
          บันทึกการแก้ไข
        </button>
        
        <div className="text-center mt-3">
           <button type="button" onClick={() => router.back()} className="btn btn-link text-white-50 text-decoration-none small">
             กลับหน้าหลัก
           </button>
        </div>
      </form>
    </div>
  );
}