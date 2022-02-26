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
  const retrievePostings = useCallback(
    async (tagSelected?: string, lastPosting?: Posting) => {
      if (id) {
        setLocalLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500)); // 스켈레톤 잛보이게 하려고 지연시간 추가
        const newPostings = await getUserPostings(id, tagSelected, lastPosting, pageCount);
        const commentsCounts = await Promise.all(newPostings.map(posting => getCommentsCount(posting.uid)));
        if (newPostings.length !== 10) setHasMore(false);
        setLocalLoading(false);
        return [...newPostings.map((posting, i) => ({ ...posting, commentsCount: commentsCounts[i] }))];
      }
    },
    [id, setLocalLoading],
  );

  // 무한스크롤 구현을 위한 IntersectionObserver 객체
  const observerRef = useRef<IntersectionObserver>();
  const [hasMore, setHasMore] = useState(true);

  const observer = (node: HTMLDivElement | null) => {
    if (localLoading) return;
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(async ([entry]) => {
      if (entry.isIntersecting && hasMore) {
        const nextPostings = await retrievePostings(selectedTag, postings.slice(-1)[0]);
        setPostings(prev => [...prev, ...(nextPostings || [])]);
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

  // UserPostSummary에서 태그 클릭시
  const handleSelectTag = useCallback(
    (tag: string) => {
      setHasMore(true);
      const asyncFunc = async () => {
        setSelectedTag(tag);
        setPostings([]);
        // await함수를 만나면 setState 함수가 일괄 배치 처리된다.
        const newPostings = await retrievePostings(tag);
        setPostings(newPostings || []);
      };
      asyncFunc();
    },
    [retrievePostings],
  );

  // TagList에서 태그 클릭시
  const onSelectTag = useCallback(
    (e: MouseEvent) => {
      const tag = (e.target as any)?.dataset?.tag || '';
      handleSelectTag(tag);
    },
    [handleSelectTag],
  );

  return (
    <div className="container d-flex align-items-center flex-column " style={{ position: 'relative', width: '60%' }}>
      {user && <Profile user={user} style={{ marginBottom: '3rem' }} />}
      <TagList tags={tags} selectedTag={selectedTag} onSelect={onSelectTag} />
      {postings &&
        user &&
        postings.map(posting => {
          return <UserPostSummary key={posting.uid} posting={posting} user={user} onClickTag={handleSelectTag} />;
        })}
      {currentUser!.displayName && <div>쉬</div>}
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
