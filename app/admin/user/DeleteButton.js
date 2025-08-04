'use client';

import { useRouter } from 'next/navigation';
import styles from './DeleteButton.module.css'; // <-- import css module

export default function DeleteButton({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const res = await fetch(`http://itdev.cmtc.ac.th:3000/api/users/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete user.');

      router.refresh();
    } catch (error) {
      alert('Error deleting user: ' + error.message);
    }
  };

  return (
    <button
      className={`btn btn-danger btn-sm ${styles.deleteBtn}`}
      onClick={handleDelete}
    >
      <i className="fa fa-trash"></i> Del
    </button>
  );
}
