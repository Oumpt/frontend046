'use client';

import { useSearchParams } from 'next/navigation';
import ResultComponent from '../component/ResultComponent';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  return (
    <div>
      <h2>ผลการค้นหา: "{query}"</h2>

      <ResultComponent searchQuery={query} />
    </div>
  );
}
