'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from 'sweetalert2';
import styles from './DeleteButton.module.css';

export default function DeleteButton({ id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'แน่ใจแล้วน๊าา?',
      text: 'มันยังไม่จบหรอก555!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'ใช่, ลบเลย!',
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    try {
      const res = await fetch(`https://backend-nextjs-virid.vercel.app/api/users/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Failed to delete user.');
      }

      await Swal.fire({
        icon: 'success',
        title: 'ลบละจ้า!',
        text: 'หายไปแย้ว.',
        timer: 2000,
        showConfirmButton: false,
      });

      router.refresh(); // refresh SSR data
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Error deleting user: ' + error.message,
      });
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
