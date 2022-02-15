import React, { useCallback, useEffect, useState } from 'react';
import { getPostings, Posting } from '../service/firebase/PostingService';
import PostingCard from '../domain/Dashboard/PostingCard';
import { User } from '../service/firebase/UserService';
import PostingCardSkeleton from '../domain/Dashboard/PostingCardSkeleton';
import { useCommon } from '../context/CommonContext';

export default function Dashboard() {
  const [postings, setPostings] = useState<(Posting & { user: User })[]>([]);
  const { localLoading, setLocalLoading } = useCommon();

  const retrievePostings = useCallback(async () => {
    setLocalLoading(true);
    const postings = await getPostings();
    await setPostings(prev => [...prev, ...postings]);
    setLocalLoading(false);
  }, []);
  useEffect(() => {
    retrievePostings();
  }, []);

  return (
    <div className="overflow-scroll w-100 flex-grow-1">
      <div className="container-xl">
        <div className="row row-cols-4">
          {postings.map(({ user, ...posting }) => (
            <PostingCard key={posting.uid} posting={posting} user={user} />
          ))}
          {localLoading &&
            Array(8)
              .fill(0)
              .map((e, i) => <PostingCardSkeleton key={i} />)}
        </div>
      </div>
    </div>
  );
}
