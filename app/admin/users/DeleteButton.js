'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ id, onDeleted, targetUsername }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    // 1. ถามเพื่อความแน่ใจ
    const result = await Swal.fire({
      title: 'ยืนยันการลบสมาชิก?',
      text: targetUsername === localStorage.getItem('username') 
        ? 'หากคุณลบตัวเอง ระบบจะพาคุณออกจากระบบทันที!' 
        : 'ข้อมูลสมาชิกท่านนี้จะถูกลบออกจากระบบอย่างถาวร!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6e7881',
      confirmButtonText: 'ใช่, ลบเลย!',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const currentUsername = localStorage.getItem('username'); // ชื่อเราเองที่ล็อกอินอยู่
      const apiUrl = 'https://backend046.vercel.app/api/users';

      // 2. เรียก API DELETE
      const res = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'ไม่สามารถลบข้อมูลได้');
      }

      // 3. แสดงผลสำเร็จ
      await Swal.fire({
        icon: 'success',
        title: 'สำเร็จ!',
        text: 'ลบข้อมูลเรียบร้อยแล้ว',
        timer: 1500,
        showConfirmButton: false,
      });

      // 4. ✅ Logic การเด้งออก: ถ้าชื่อที่ลบตรงกับชื่อที่เราล็อกอินอยู่
      if (targetUsername === currentUsername) {
        localStorage.clear(); // ล้าง Token และข้อมูลทั้งหมด
        window.location.href = '/login'; // ใช้ window.location เพื่อให้หน้าเว็บล้างสถานะใหม่หมด
      } else {
        onDeleted?.(id); // ถ้าลบคนอื่น แค่เอาการ์ดออกจากการแสดงผล
      }

    } catch (error) {
      console.error('Delete error:', error);
      await Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด!',
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="btn btn-danger btn-sm shadow-sm rounded-pill px-3"
      onClick={handleDelete}
      disabled={loading}
      style={{ minWidth: '85px' }}
    >
      {loading ? (
        <span className="spinner-border spinner-border-sm" role="status"></span>
      ) : (
        <>🗑️ Delete</>
      )}
    </button>
  );
}