'use client';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

export default function Page() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    async function getUsers() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('http://itdev.cmtc.ac.th:3000/api/users');
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setItems(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getUsers();
    const interval = setInterval(getUsers, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      const res = await fetch(`http://itdev.cmtc.ac.th:3000/api/users/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      alert('Error deleting user: ' + error.message);
    }
  };

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

          {/* Scrollable container มี scrollbar แนวนอนและแนวตั้ง */}
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
            }}
            ref={scrollRef}
          >
            {loading && <p>Loading data...</p>}
            {error && <p className="text-danger">Error: {error}</p>}

            <table
              className="table table-striped table-hover"
              style={{
                minWidth: '1300px',
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
                {items.length > 0 ? (
                  items.map((item) => (
                    <tr key={item.id}>
                      <td
                        className='text-center'
                        style={{ border: '1px solid #dee2e6' }}
                      >
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
                        <Link href={`/admin/user/edit/${item.id}`}>
                          <button className="btn btn-warning btn-sm">Edit</button>
                        </Link>
                      </td>
                      <td style={{ border: '1px solid #dee2e6' }}>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          <i className="fa fa-trash"></i> Del
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  !loading && (
                    <tr>
                      <td colSpan="11" className="text-center">
                        No users found.
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <br /><br />

      <style jsx>{`
        .card-body::-webkit-scrollbar {
          height: 12px;
          width: 12px;
        }
        .card-body::-webkit-scrollbar-track {
          background: #ddd;
          border-radius: 10px;
        }
        .card-body::-webkit-scrollbar-thumb {
          background-color: #888;
          border-radius: 10px;
          border: 3px solid #ddd;
        }
        .card-body::-webkit-scrollbar-thumb:hover {
          background-color: #555;
        }
      `}</style>
    </>
  );
}
