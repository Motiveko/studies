import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button, Form } from "react-bootstrap";
import SingleComment from "../../components/SingleComment";

import {
  addComment,
  Comment,
  getComments,
} from "../../service/firebase/CommentService";
import { User } from "../../service/firebase/UserService";
import useAuth from "../../store/auth/useAuth";

type props = {
  postId: string;
};
function Commments({ postId }: props) {
  const [comments, setComments] = useState<(Comment & { user: User })[]>([]);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useAuth();
  const initComments = useCallback(
    async () => {
      setComments(await getComments(postId));
    },
    [postId],
  );
  useEffect(() => {
    initComments();
  }, [initComments]);

  const uploadComment = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!user || !commentRef.current) {
        throw new Error("댓글을 달 수 없습니다.");
      }
      await addComment({
        userId: user.uid,
        postId,
        comment: commentRef.current.value,
      });
      commentRef.current.value = "";
      initComments();
    },
    [user, initComments, postId],
  );
  return (
    <div className="mt-5">
      <h5>
        {comments.length}
        {' '}
        개의 댓글
      </h5>
      {user && (
        <Form onSubmit={uploadComment}>
          <Form.Control
            as="textarea"
            placeholder="댓글을 입력하세요."
            ref={commentRef}
            className="my-2"
            style={{ resize: "none" }}
            required
          />
          <div className="text-end">
            <Button type="submit" variant="success">
              댓글 작성
            </Button>
          </div>
        </Form>
      )}
      {comments.map((cmt) => (
        <SingleComment
          key={cmt.uid}
          commentUser={cmt}
          onChange={initComments}
        />
      ))}
    </div>
  );
}

export default React.memo(Commments);
