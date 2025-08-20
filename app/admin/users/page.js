'use client'; // ✅ ต้องมีเพื่อใช้ localStorage และ useEffect

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DeleteButton from './DeleteButton'; // ✅ ปุ่มลบยังคงใช้เหมือนเดิม

// ฟังก์ชันโหลด users (ไม่ใช้ cache)
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
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // ✅ redirect ถ้าไม่มี token
      return;
    }

    // โหลด users ถ้ามี token
    getUsers()
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return <div className="text-center"><h1>Loading...</h1></div>;
  }

  return (
    <>
      <br /><br /><br /><br />
      <div className="container" style={{ maxWidth: '98vw', position: 'relative' }}>
        <div className="card">
          <div
            className="card-header"
            style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
          >
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
              scrollbarWidth: 'thin',
              scrollbarColor: '#888 #ddd',
              WebkitOverflowScrolling: 'touch',
              minWidth: '1300px',
            }}
          >
            {items.length === 0 && (
              <p className="text-center">No users found.</p>
            )}

            {items.length > 0 && (
              <table
                className="table table-striped table-hover"
                style={{
                  borderCollapse: 'collapse',
                  width: '100%',
                }}
              >
                <thead
                  style={{
                    backgroundColor: '#f8f9fa',
                    borderBottom: '2px solid #dee2e6',
                  }}
                >
                  <tr>
                    <th className='text-center' style={{ border: '1px solid #dee2e6' }}>#</th>
                    <th style={{ border: '1px solid #dee2e6' }}>Firstname</th>
                    <th style={{ border: '1px solid #dee2e6' }}>Fullname</th>
                    <th style={{ border: '1px solid #dee2e6' }}>Lastname</th>
                    <th style={{ border: '1px solid #dee2e6' }}>Username</th>
                    <th style={{ border: '1px solid #dee2e6' }}>Password</th>
                    <th style={{ border: '1px solid #dee2e6' }}>Address</th>
                    <th style={{ border: '1px solid #dee2e6' }}>Sex</th>
                    <th style={{ border: '1px solid #dee2e6' }}>Birthday</th>
                    <th style={{ border: '1px solid #dee2e6' }}>Edit</th>
                    <th style={{ border: '1px solid #dee2e6' }}>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className='text-center' style={{ border: '1px solid #dee2e6' }}>
                        {item.id}
                      </td>
                      <td style={{ border: '1px solid #dee2e6' }}>{item.firstname}</td>
                      <td style={{ border: '1px solid #dee2e6' }}>{item.fullname}</td>
                      <td style={{ border: '1px solid #dee2e6' }}>{item.lastname}</td>
                      <td style={{ border: '1px solid #dee2e6' }}>{item.username}</td>
                      <td style={{ border: '1px solid #dee2e6' }}>{item.password}</td>
                      <td style={{ border: '1px solid #dee2e6' }}>{item.address}</td>
                      <td style={{ border: '1px solid #dee2e6' }}>{item.sex}</td>
                      <td style={{ border: '1px solid #dee2e6' }}>{item.birthday}</td>
                      <td style={{ border: '1px solid #dee2e6' }}>
                        <Link href={`/admin/users/edit/${item.id}`}>
                          <button className="btn btn-warning btn-sm">Edit</button>
                        </Link>
                      </td>
                      <td style={{ border: '1px solid #dee2e6' }}>
                        <DeleteButton id={item.id} />
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
