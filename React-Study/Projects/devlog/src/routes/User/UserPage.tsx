import React, { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Profile from '../../components/Profile';
import UserPostSummary from '../../domain/User/UserPostSummary';
import { useAuth } from '../../context/AuthContext';
import UserPostSummarySkeleton from '../../domain/User/UserPostSummarySkeleton';
import { useUser } from '../../hooks/useUser';
import { getCommentsCount } from '../../service/firebase/CommentService';
import { getTags, getUserPostings, Posting } from '../../service/firebase/PostingService';
import { useCommon } from '../../context/CommonContext';
import TagList from '../../domain/User/TagList';

function UserPage() {
  const { currentUser } = useAuth();
  const [postings, setPostings] = useState<(Posting & { commentsCount: number })[]>([]);
  const { localLoading, setLocalLoading } = useCommon();

  const { id } = useParams();
  const [user] = useUser(id);
  // const [selectedTag, setSelectedTag] = useState('너무많은');
  const [selectedTag, setSelectedTag] = useState('');

  // 포스팅 취득
  const retrievePostings = useCallback(async () => {
    setLocalLoading(true);
    if (id) {
      await new Promise(resolve => setTimeout(resolve, 500)); // 스켈레톤 잛보이게 하려고 지연시간 추가
      const newPostings = await getUserPostings(id, selectedTag, postings.slice(-1)[0], pageCount);
      const commentsCounts = await Promise.all(newPostings.map(posting => getCommentsCount(posting.uid)));
      if (newPostings.length !== 10) setHasMore(false);
      setPostings(prev => [...prev, ...newPostings.map((posting, i) => ({ ...posting, commentsCount: commentsCounts[i] }))]);
    }
    setLocalLoading(false);
  }, [id, postings, selectedTag, setLocalLoading]);

  // 무한스크롤 구현을 위한 IntersectionObserver 객체
  const observerRef = useRef<IntersectionObserver>();
  const [hasMore, setHasMore] = useState(true);

  const observer = (node: HTMLDivElement | null) => {
    if (localLoading) return;
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore) {
        retrievePostings();
      }
    });

    node && observerRef.current.observe(node);
  };

  // 태그 목록 관리
  const [tags, setTags] = useState([{ name: '', count: 0 }]);
  const retrieveTags = useCallback(async () => {
    if (!id) return;
    const tagCount = await getTags(id);
    setTags(tagCount);
  }, [id]);

  useEffect(() => {
    retrieveTags();
  }, [retrieveTags]);

  const onSelectTag = useCallback(
    (e: MouseEvent) => {
      const tag = (e.target as any)?.dataset?.tag;
      if (!tag) {
        setSelectedTag('');
      }
      setSelectedTag(tag);
      // TODO: 태그 선택시 현재 포스팅 데이터를 비우고 조회해야하는데, 이게 불가능하다. await setPostings([]) 와 같은 코드를 실행시켜 해결할 수 있을까?
      // retrievePostings();
    },
    [retrievePostings],
  );

  return (
    <div className="container d-flex align-items-center flex-column " style={{ position: 'relative', width: '60%' }}>
      {user && <Profile user={user} style={{ marginBottom: '3rem' }} />}
      {/* <TagList tags={tags} selectedTag={selectedTag} onSelect={onSelectTag} /> */}
      {postings &&
        user &&
        postings.map(posting => {
          return <UserPostSummary key={posting.uid} posting={posting} user={user} />;
        })}
      {localLoading &&
        Array(5)
          .fill(0)
          .map((e, i) => <UserPostSummarySkeleton key={i} />)}
      <div ref={observer} style={{ width: '1px', height: '1px' }} id="scroll-target"></div>
    </div>
  );
}
const pageCount = 10;
export default React.memo(UserPage);
