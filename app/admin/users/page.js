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

  // ถ้ากำลังเช็ค auth หรือโหลดข้อมูล ให้แสดง loader ครอบเต็มจอ
  if (checkingAuth || loading) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0, // top:0; bottom:0; left:0; right:0;
          backgroundColor: '#fff',
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
        <h2 style={{ fontWeight: 'bold', color: '#333' }}>
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

  // โหลดเสร็จแล้ว แสดง content ปกติ (footer ก็ไม่เด้งขึ้นเพราะ loader ครอบเต็มจอช่วง loading)
  return (
    <>
      <br /><br /><br /><br />
      <div className="container" style={{ maxWidth: '98vw', position: 'relative' }}>
        <div className="card">
          <div className="card-header" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            Users List
          </div>

          <div
            className="card-body"
            style={{
              maxHeight: '70vh',
              overflowY: 'auto',
              overflowX: 'auto',
              border: '1px solid #ddd',
              borderRadius: '4px',
              position: 'relative',
              minWidth: '1300px',
            }}
          >
            {items.length === 0 && (
              <p className="text-center">No users found.</p>
            )}

            {items.length > 0 && (
              <table className="table table-striped table-hover">
                <thead style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                  <tr>
                    <th className="text-center">#</th>
                    <th>Firstname</th>
                    <th>Fullname</th>
                    <th>Lastname</th>
                    <th>Username</th>
                    <th>Address</th>
                    <th>Sex</th>
                    <th>Birthday</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="text-center">{item.id}</td>
                      <td>{item.firstname}</td>
                      <td>{item.fullname}</td>
                      <td>{item.lastname}</td>
                      <td>{item.username}</td>
                      <td>{item.address}</td>
                      <td>{item.sex}</td>
                      <td>{item.birthday}</td>
                      <td>
                        <Link href={`/admin/users/edit/${item.id}`}>
                          <button className="btn btn-warning btn-sm">Edit</button>
                        </Link>
                      </td>
                      <td>
                        <DeleteButton id={item.id} onDeleted={handleDeleteUser} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <br /><br />
    </>
  );
}
