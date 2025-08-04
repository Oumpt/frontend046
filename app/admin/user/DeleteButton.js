'use client';

import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const res = await fetch(`http://itdev.cmtc.ac.th:3000/api/users/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete user.');

      // รีเฟรชหน้า เพื่อดึงข้อมูลใหม่
      router.refresh();
    } catch (error) {
      alert('Error deleting user: ' + error.message);
    }
  };

  return (
    <button
      className="btn btn-danger btn-sm"
      onClick={handleDelete}
    >
      <i className="fa fa-trash"></i> Del
      <style jsx>{`
        button {
          cursor: pointer;
        }
        button:hover {
          background-color: #c82333;
          border-color: #bd2130;
        }
      `}</style>
    </button>
  );
}
