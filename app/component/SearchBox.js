'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} role="search" style={{ width: '220px' }}>
      <div className="position-relative">
        <input
          type="search"
          className="form-control"
          placeholder="ค้นหา"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            paddingRight: '2.5rem',
            borderRadius: '999px',
          }}
        />
        <button
          type="submit"
          style={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            padding: 0,
            margin: 0,
            cursor: 'pointer',
            color: '#999',
          }}
        >
          <i className="bi bi-search" />
        </button>
      </div>
    </form>
  );
}