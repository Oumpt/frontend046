'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DeleteButton from './DeleteButton';
import Swal from 'sweetalert2';

async function getUsers() {
  const res = await fetch('https://backend-nextjs-virid.vercel.app/api/users', {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }
  return res.json();
}

export default function Page() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณาเข้าสู่ระบบก่อนใช้งาน',
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      }).then(() => {
        router.push('/login');
      });
      return;
    }

    setCheckingAuth(false);

    const fetchData = () => {
      getUsers()
        .then((data) => {
          setItems(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error:', error);
          setLoading(false);
        });
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, [router]);

  const handleDeleteUser = (deletedId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== deletedId));
  };

  if (checkingAuth || loading) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#f9fafb',
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
        <h2 style={{ fontWeight: 'bold', color: '#374151' }}>
          {checkingAuth ? 'กำลังตรวจสอบสิทธิ์...' : 'กำลังโหลดข้อมูล...'}
        </h2>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
          .loader {
            border-top-color: #3b82f6;
            animation: spin 1s linear infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="container py-3 px-3">
      {/* Header */}
      <div
        className="d-flex justify-content-between align-items-center mb-3"
        style={{ marginTop: '60px' }}
      >
        <h2 className="fw-bold text-primary">👥 Users Dashboard</h2>
      </div>

      {/* Grid แสดง Users */}
      <div
        className="row g-3 mt-2"
        style={{
          maxHeight: '75vh',
          overflowY: 'auto',
        }}
      >
        {items.length === 0 && (
          <p className="text-center text-muted">No users found.</p>
        )}

        {items.map((item) => (
          <div key={item.id} className="col-12 col-md-6 col-lg-4">
            <div
              className="card border-0 h-100 shadow-sm"
              style={{
                borderRadius: '16px',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                backgroundColor: '#fff', // ✅ ใส่สีขาวกลับมาเฉพาะการ์ด
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow =
                  '0 6px 18px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 4px 12px rgba(0,0,0,0.08)';
              }}
            >
              <div className="card-body p-3">
                <h6 className="card-title fw-bold text-primary mb-2">
                  {item.firstname} {item.lastname}
                </h6>
                <p className="mb-1 small">
                  <strong>Fullname:</strong> {item.fullname}
                </p>
                <p className="mb-1 small">
                  <strong>Username:</strong> {item.username}
                </p>
                <p className="mb-1 small">
                  <strong>Address:</strong> {item.address}
                </p>
                <p className="mb-1 small">
                  <strong>Birthday:</strong> {item.birthday}
                </p>
                <p className="mb-2 small">
                  <strong>Sex:</strong>{' '}
                  <span
                    className={`badge ${
                      item.sex === 'Male'
                        ? 'bg-primary'
                        : item.sex === 'Female'
                        ? 'bg-danger'
                        : 'bg-secondary'
                    }`}
                  >
                    {item.sex}
                  </span>
                </p>

                {/* ปุ่ม Action */}
                <div className="d-flex justify-content-end gap-2">
                  <Link href={`/admin/users/edit/${item.id}`}>
                    <button className="btn btn-warning btn-sm shadow-sm rounded-pill px-3">
                      ✏️ Edit
                    </button>
                  </Link>
                  <DeleteButton id={item.id} onDeleted={handleDeleteUser} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
