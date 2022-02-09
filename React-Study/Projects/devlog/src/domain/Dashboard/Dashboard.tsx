import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FirebaseTime, getPosting, getPostings, Posting } from '../../firebase/PostingService';
import { parseText } from '../../utils/markdown-parser-util';
import PostingCard from './PostingCard';

export default function Dashboard() {
  const [postings, setPostings] = useState<Posting[]>([]);
  useEffect(() => {
    async function get() {
      const documentSnapshots = await getPostings();
      setPostings(prev => [...prev, ...documentSnapshots.docs.map(doc => parseDocIntoPosting(doc)), ...documentSnapshots.docs.map(doc => parseDocIntoPosting(doc)).slice(3)]);
    }
    get();
  }, []);

  return (
    <div className="container">
      <div className="row row-cols-5 ">
        {postings.map(({ uid, thumbnail, title, description, updatedAt }, i) => (
          <PostingCard key={uid} thumbnail={thumbnail} title={title} description={description} updatedAt={updatedAt as FirebaseTime} />
        ))}
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
