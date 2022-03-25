import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteEdit from "../../components/DeleteEdit";
import SmallProfile from "../../components/SmallProfile";
import { useCommon } from "../../context/CommonContext";
import {
  deletePosting,
  FirebaseTime,
  Posting,
} from "../../service/firebase/PostingService";
import { User } from "../../service/firebase/UserService";
import { parseDate } from "../../utils/date-utils";
import Tags from "./Tags";

type props = {
  posting: Posting;
  user: User;
  isCurrentUser: boolean;
};
function PostHeader({ posting, user, isCurrentUser }: props) {
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    setDate(parseDate((posting.updatedAt as FirebaseTime).seconds * 1000));
  }, [posting.updatedAt]);

  const navigate = useNavigate();
  const { setGlobalLoading } = useCommon();
  const deletePost = useCallback(async () => {
    if (confirm("포스트를 진짜로 삭제하시겠습니까?")) {
      setGlobalLoading(true);
      await deletePosting(posting.uid);
      setGlobalLoading(false);

      alert("포스트를 삭제하였습니다.");
      navigate("/");
    }
  }, [navigate, posting.uid, setGlobalLoading]);

  return (
    <>
      <h1>{posting.title}</h1>
      <div className="d-flex align-items-center">
        {user && <SmallProfile user={user} imageSize={2} />}
        <div className="ms-2 text-muted">{date}</div>
        {isCurrentUser && (
          <DeleteEdit
            onEdit={() => navigate(`/user/post/${posting.uid}`)}
            onDelete={deletePost}
            className="ms-auto"
          />
        )}
      </div>
      <Tags tags={posting.tags} />
    </>
  );
}

export default React.memo(PostHeader);
