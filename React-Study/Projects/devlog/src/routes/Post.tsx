import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useCommon } from '../context/CommonContext';
import { getPosting, Posting } from '../service/firebase/PostingService';
import { parseText } from '../utils/markdown-parser-util';
import { Chip, Link } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { User } from '../service/firebase/UserService';
import Profile from '../components/Profile';
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
        {posting && !localLoading && (
          <>
            <h1>{posting.title}</h1>
            <div className="d-flex">
              {user && <Profile user={user} imageSize={2} />}

              {posting.userId === currentUser?.uid && (
                <div className="ms-auto">
                  <Link className="me-2">수정</Link>
                  <Link>삭제</Link>
                  {/* <Link to={`/user/newPosts/${id}`}>수정</Link> */}
                </div>
              )}
            </div>
            <div className="d-flex mt-3">
              {posting.tags.map((tag, i) => {
                return <Chip key={i} className="me-2" label={tag} />;
              })}
            </div>
            <hr />
            <div id="preview" dangerouslySetInnerHTML={{ __html: code }}></div>
          </>
        )}
      </div>
    </div>
  );
}

const PostSkeleton = () => {
  return (
    <>
      <div>
        {/* 제목 */}
        <Typography className="w-100" component="div" variant={'h2'}>
          <Skeleton />
        </Typography>
      </div>
      <div>
        {/* 프로필, tag */}
        <Skeleton variant="text" width={240} height={'3rem'} />
        <div className="d-flex">
          <Skeleton variant="circular" className="me-2" width={50} height={30} />
          <Skeleton variant="circular" className="me-2" width={50} height={30} />
          <Skeleton variant="circular" className="me-2" width={50} height={30} />
        </div>
      </div>
      <div className="container mt-5">
        {/* 컨텐츠 */}
        <Skeleton variant="text" width={'80%'} height={30} />
        <Skeleton variant="text" width={'70%'} height={30} />
        <Skeleton variant="text" width={'90%'} height={30} />
        <Skeleton className="mt-3" variant="rectangular" width={'90%'} height={200} />
        <Skeleton variant="text" width={'80%'} height={30} />
        <Skeleton variant="text" width={'70%'} height={30} />
        <Skeleton variant="text" width={'90%'} height={30} />
        <Skeleton className="mt-3" variant="rectangular" width={'100%'} height={200} />
      </div>
    </>
  );
};
