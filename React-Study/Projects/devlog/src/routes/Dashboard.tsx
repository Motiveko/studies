import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FirebaseTime, getPosting, getPostings, Posting } from '../firebase/PostingService';
import { parseText } from '../utils/markdown-parser-util';
import PostingCard from '../domain/Dashboard/PostingCard';

export default function Dashboard() {
  const [postings, setPostings] = useState<Posting[]>([]);
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
          {postings.map(({ uid, thumbnail, title, description, updatedAt }, i) => (
            <PostingCard key={uid} thumbnail={thumbnail} title={title} description={description} updatedAt={updatedAt as FirebaseTime} />
          ))}
        </div>
      </div>
    </div>
  );
}

type ParseDocIntoPosting = (doc: QueryDocumentSnapshot<DocumentData>) => Posting;

const parseDocIntoPosting: ParseDocIntoPosting = doc => {
  return {
    uid: doc.id,
    ...doc.data(),
    content: parseText(doc.data().content),
  } as Posting;
};
