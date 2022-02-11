import React, { useEffect, useState } from 'react';
import { getPostings, Posting } from '../service/firebase/PostingService';
import PostingCard from '../domain/Dashboard/PostingCard';
import { User } from '../service/firebase/UserService';

export default function Dashboard() {
  const [postings, setPostings] = useState<(Posting & { user: User })[]>([]);
  useEffect(() => {
    async function get() {
      const postings = await getPostings();
      setPostings(prev => [...prev, ...postings]);
    }
    get();
  }, []);

  return (
    <div className="overflow-scroll w-100" style={{ height: 'calc(100vh - 60px)' }}>
      <div className="container-xl">
        <div className="row row-cols-4">
          {postings.map(({ user, ...posting }) => (
            <PostingCard key={posting.uid} posting={posting} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
