'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DeleteButton from './DeleteButton';

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
      router.push('/login');
      return;
    }

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

    const intervalId = setInterval(fetchData, 5000); // ดึงข้อมูลทุก 5 วินาที

    return () => clearInterval(intervalId); // เคลียร์ interval ตอน component unmount
  }, [router]);

  const handleDeleteUser = (deletedId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== deletedId));
  };

  if (loading) {
    return <div className="text-center"><h1>Loading...</h1></div>;
  }

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
                    <th>Password</th>
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
                      <td>{item.password}</td>
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
