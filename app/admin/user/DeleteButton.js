'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './DeleteButton.module.css';

export default function DeleteButton({ id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    setLoading(true);
    try {
      const res = await fetch(`http://itdev.cmtc.ac.th:3000/api/users/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete user.');

      router.refresh(); // รีเฟรชหน้าถ้าใช้ SSR แบบเดิม
      // หรือถ้าใช้ polling ไม่ต้องรีเฟรชก็ได้
    } catch (error) {
      alert('Error deleting user: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`btn btn-danger btn-sm ${styles.deleteBtn}`}
      onClick={handleDelete}
      disabled={loading}
    >
      <i className="fa fa-trash"></i> {loading ? 'Deleting...' : 'Del'}
    </button>
  );
}
