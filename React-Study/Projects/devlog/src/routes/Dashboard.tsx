import React, { useCallback, useRef, useState } from "react";
import { getPostings, Posting } from "../service/firebase/PostingService";
import PostingCard from "../domain/Dashboard/PostingCard";
import { User } from "../service/firebase/UserService";
import PostingCardSkeleton from "../domain/Dashboard/PostingCardSkeleton";
import { useCommon } from "../context/CommonContext";

export default function Dashboard() {
  const [postings, setPostings] = useState<(Posting & { user: User })[]>([]);
  const { localLoading, setLocalLoading } = useCommon();

  const observerRef = useRef<IntersectionObserver>(); // 무한스크롤 구현을 위한 IntersectionObserver 객체
  const [hasMore, setHasMore] = useState(true); // 더 가져올 포스팅이 있는지

  /** 포스팅 가져오기 */
  const retrievePostings = useCallback(async () => {
    if (!hasMore || localLoading) {
      return;
    }
    setLocalLoading(true);
    await new Promise((resolve) => { setTimeout(resolve, 500); }); // 스켈레톤 잛보이게 하려고 지연시간 추가
    const newPostings = await getPostings(
      postings.length > 0 ? postings[postings.length - 1] : null,
    );
    if (newPostings.length < 25) setHasMore(false);
    await setPostings((prev) => [...prev, ...newPostings]);

    setLocalLoading(false);
    // deps에 localLoading, posting.length 없으면 계속 같은값 참조해서 무한 요청 보내게된다.
  }, [hasMore, localLoading, postings, setLocalLoading]);

  /*
    IntersectionObserver API를 이용한 무한스크롤 구현 참고
    https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API => 공식문서 한글부분 먼저 읽자
    https://rrecoder.tistory.com/171
  */
  const observer = (node: HTMLDivElement | null) => {
    if (localLoading) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore) {
        retrievePostings();
      }
    });
    // eslint-disable-next-line no-unused-expressions
    node && (observerRef.current.observe(node));
  };

  return (
    <div className="overflow-scroll w-100 flex-grow-1">
      <div className="container-xl">
        <div className="row row-cols-4">
          {postings.map(({ user, ...posting }) => (
            <PostingCard key={posting.uid} posting={posting} user={user} />
          ))}
          {localLoading
            && Array(25)
              .fill(0)
              .map((e, i) => <PostingCardSkeleton key={i} />)}
          <div ref={observer} id="scroll-target" />
        </div>
      </div>
    </div>
  );
}
