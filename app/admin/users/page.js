'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DeleteButton from './DeleteButton';

export default function AdminUsersPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch('https://backend046.vercel.app/api/users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          cache: 'no-store'
        });

        if (res.status === 401 || res.status === 403) {
          throw new Error('Unauthorized');
        }

        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (error) {
        if (error.message === 'Unauthorized') {
          localStorage.clear();
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleDeleteUser = (id) => {
    setItems((prev) => prev.filter((user) => user.id !== id));
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="container py-3 px-3">
      <div className="d-flex justify-content-between align-items-center mb-3" style={{ marginTop: '80px' }}>
        <h2 className="fw-bold text-primary text-shadow">👥 Users Dashboard</h2>
        <span className="badge bg-secondary">Total: {items.length}</span>
      </div>

      <div className="row g-3 mt-2" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
        {items.length === 0 ? (
          <p className="text-center text-white">ไม่พบข้อมูลผู้ใช้</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="col-12 col-md-6 col-lg-4">
              <div className="card border-0 h-100 shadow" style={{ borderRadius: '16px', backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(5px)' }}>
                <div className="card-body p-4">
                  <h6 className="card-title fw-bold text-primary mb-2">
                    {item.firstname} {item.lastname}
                  </h6>
                  <p className="mb-1 small text-dark"><strong>Username:</strong> {item.username}</p>
                  
                  {/* ✅ แสดงสถานะ Status */}
                  <p className="mb-1 small text-dark">
                    <strong>Status:</strong>{' '}
                    <span className={`badge ${item.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                      {item.status || 'active'}
                    </span>
                  </p>

                  {/* ✅ เพิ่มการแสดง Role (สิทธิ์การใช้งาน) */}
                  <p className="mb-2 small text-dark">
                    <strong>Role:</strong>{' '}
                    <span className={`badge ${item.role === 'admin' ? 'bg-info' : 'bg-dark opacity-75'}`}>
                      {item.role === 'admin' ? '🛡️ Admin' : '👤 Staff'}
                    </span>
                  </p>

                  <div className="d-flex justify-content-end gap-2 mt-3">
                    <Link href={`/admin/users/edit/${item.id}`}>
                      <button className="btn btn-warning btn-sm rounded-pill px-3 shadow-sm">✏️ Edit</button>
                    </Link>
                    <DeleteButton 
                      id={item.id} 
                      onDeleted={handleDeleteUser} 
                      targetUsername={item.username} 
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}