import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Profile from '../../components/Profile';
import UserPostSummary from '../../components/UserPostSummary';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../hooks/useUser';
import { getCommentsCount } from '../../service/firebase/CommentService';
import { getUserPostings, Posting } from '../../service/firebase/PostingService';

function UserPage() {
  const { currentUser } = useAuth();
  const [postings, setPostings] = useState<(Posting & { commentsCount: number })[]>([]);

  const { id } = useParams();
  const [user] = useUser(id);

  const getPostings = useCallback(async () => {
    if (id) {
      const newPostings = await getUserPostings(id, undefined, 10);
      const commentsCounts = await Promise.all(newPostings.map(posting => getCommentsCount(posting.uid)));
      setPostings(prev => [...prev, ...newPostings.map((posting, i) => ({ ...posting, commentsCount: commentsCounts[i] }))]);
    }
  }, [id]);

  useEffect(() => {
    getPostings();
  }, []);
  return (
    <div className="container d-flex align-items-center flex-column " style={{ width: '70%' }}>
      <h1>개발중,,</h1>
      {/* <div>{currentUser?.displayName} 의 페이지</div> */}
      {user && <Profile user={user} style={{ marginBottom: '3rem' }} />}
      {postings &&
        user &&
        postings.map(posting => {
          return <UserPostSummary key={posting.uid} posting={posting} user={user} />;
        })}
    </div>
  );
}
export default React.memo(UserPage);
