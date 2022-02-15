import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCommon } from '../context/CommonContext';
import { getPosting, Posting } from '../service/firebase/PostingService';
import { parseText } from '../utils/markdown-parser-util';
import { useAuth } from '../context/AuthContext';
import { User } from '../service/firebase/UserService';
import PostSkeleton from '../domain/Post/PostSkeleton';
import PostHeader from '../domain/Post/PostHeader';
import Tags from '../domain/Post/Tags';
import Profile from '../components/Profile';
import { Image } from 'react-bootstrap';
import { COMMON_CONSTANT } from '../constants/CommonConstant';
import Comments from '../domain/Post/Comments';

export default function Post() {
  const { id } = useParams();
  const { currentUser } = useAuth();

  const { localLoading, setLocalLoading } = useCommon();
  const [posting, setPosting] = useState<Posting | null>(null);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (!id) {
      throw new Error('posting id값이 없습니다');
    }
    setLocalLoading(true);
    async function asyncSetPosting(id: string) {
      const { user, ...posting } = await getPosting(id);
      setPosting(posting);
      setUser(user);
    }

    asyncSetPosting(id);

    setTimeout(() => setLocalLoading(false), 300);
    console.log(posting?.tags);
  }, []);

  const code = useMemo(() => {
    if (!posting) return '';
    return parseText(posting.content);
  }, [posting]);

  return (
    // <div style={{ width: '90vw', maxWidth: '1080px' }}>
    <div className="overflow-scroll w-100 p-5" style={{ height: 'calc(100vh - 60px)' }}>
      <div className="container" style={{ maxWidth: '1080px' }}>
        {localLoading && <PostSkeleton />}
        {!localLoading && posting && user && (
          <>
            <PostHeader user={user} posting={posting} isCurrentUser={user.uid === currentUser?.uid} />
            <Tags tags={posting.tags} />
            <hr />

            <Image src={posting.thumbnail || COMMON_CONSTANT.DEFAULT_THUMBNAIL} className="d-block w-100" />

            <div id="preview" dangerouslySetInnerHTML={{ __html: code }}></div>

            <Profile user={user} />
            <Comments postId={posting.uid} />
          </>
        )}
      </div>
    </div>
  );
}
