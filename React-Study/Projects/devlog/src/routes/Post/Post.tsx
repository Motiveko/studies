import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Image } from "react-bootstrap";
import { useCommon } from "../../context/CommonContext";
import { getPosting, Posting } from "../../service/firebase/PostingService";
import { parseText } from "../../utils/markdown-parser-util";
import { User } from "../../service/firebase/UserService";
import PostSkeleton from './PostSkeleton';
import PostHeader from "./PostHeader";
import Profile from "../../components/Profile";
import { COMMON_CONSTANT } from "../../constants";
import Comments from "./Comments";
import useAuth from "../../store/auth/useAuth";

export default function Post() {
  const { id } = useParams();
  const { user } = useAuth();

  const { localLoading, setLocalLoading } = useCommon();
  const [posting, setPosting] = useState<Posting | null>(null);
  const [postUser, setPostUser] = useState<User | null>(null);
  useEffect(() => {
    if (!id) {
      throw new Error("posting id값이 없습니다");
    }
    async function asyncSetPosting(id: string) {
      setLocalLoading(true);
      const { user, ...posting } = await getPosting(id);
      setPosting(posting);
      setPostUser(user);
      setTimeout(() => setLocalLoading(false), 300);
    }

    asyncSetPosting(id);
  }, [id, setLocalLoading]);

  const code = useMemo(() => {
    if (!posting) return "";
    return parseText(posting.content);
  }, [posting]);

  return (
    // <div style={{ width: '90vw', maxWidth: '1080px' }}>
    <div
      className="overflow-scroll w-100 p-5"
      style={{ height: "calc(100vh - 60px)" }}
    >
      <div className="container" style={{ maxWidth: "1080px" }}>
        {localLoading && <PostSkeleton />}
        {!localLoading && posting && postUser && (
          <>
            <PostHeader
              user={postUser}
              posting={posting}
              isCurrentUser={postUser.uid === user?.uid}
            />

            <hr />

            <Image
              src={posting.thumbnail || COMMON_CONSTANT.DEFAULT_THUMBNAIL}
              className="d-block w-100"
            />

            <div id="preview" dangerouslySetInnerHTML={{ __html: code }} />

            <Profile user={postUser} />
            <Comments postId={posting.uid} />
          </>
        )}
      </div>
    </div>
  );
}
