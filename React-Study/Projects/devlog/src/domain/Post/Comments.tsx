import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import SingleComment from '../../components/SingleComment';
import { useAuth } from '../../context/AuthContext';
import { addComment, Comment, getComments } from '../../service/firebase/CommentService';
import { User } from '../../service/firebase/UserService';

type Prop = {
  postId: string;
};
function Commments({ postId }: Prop) {
  const [comments, setComments] = useState<(Comment & { user: User })[]>([]);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const { currentUser } = useAuth();
  const initComments = useCallback(
    async function () {
      setComments(await getComments(postId));
    },
    [postId],
  );
  useEffect(() => {
    initComments();
  }, [initComments]);

  const uploadComment = useCallback(async () => {
    if (!currentUser || !commentRef.current) {
      throw new Error('댓글을 달 수 없습니다.');
    }
    await addComment({ userId: currentUser.uid, postId, comment: commentRef.current.value });
    commentRef.current.value = '';
    initComments();
  }, [currentUser, initComments, postId]);
  return (
    <div className="mt-5">
      <h5>{comments.length} 개의 댓글</h5>
      {currentUser && (
        <>
          <Form.Control as="textarea" placeholder="댓글을 입력하세요." ref={commentRef} className="my-2" style={{ resize: 'none' }} />
          <div className="text-end">
            <Button onClick={uploadComment} variant="success">
              댓글 작성
            </Button>
          </div>
        </>
      )}
      {comments.map(cmt => {
        return <SingleComment key={cmt.uid} commentUser={cmt} onChange={initComments} />;
      })}
    </div>
  );
}

export default React.memo(Commments);
