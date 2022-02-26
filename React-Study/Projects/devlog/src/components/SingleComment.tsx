import { Avatar } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { COMMON_CONSTANT } from '../constants/CommonConstant';
import { useAuth } from '../context/AuthContext';
import CommentForm from '../domain/Post/CommentForm';
import { Comment, deleteComment, updateComment } from '../service/firebase/CommentService';
import { FirebaseTime } from '../service/firebase/PostingService';
import { User } from '../service/firebase/UserService';
import { parseDate } from '../utils/date-utils';
import DeleteEdit from './DeleteEdit';

type props = {
  commentUser: Comment & { user: User };
  onChange: () => void;
};
function SingleComment({ commentUser, onChange }: props) {
  const { currentUser } = useAuth();
  const date = useMemo(() => parseDate((commentUser.updatedAt as FirebaseTime).seconds * 1000), [commentUser]);

  const commentRef = useRef<HTMLTextAreaElement>(null);

  const [openEdit, setOpenEdit] = useState(false);

  const editComment = useCallback(async () => {
    if (!commentRef.current) {
      throw new Error('댓글을 수정할 수 없습니다.');
    }
    await updateComment({
      comment: commentRef.current.value,
      uid: commentUser.uid,
      postId: commentUser.postId,
    });
    onChange();
    setOpenEdit(false);
  }, [commentUser.postId, commentUser.uid, onChange]);

  const removeComment = useCallback(async () => {
    if (confirm('댓글을 삭제하시겠습니까?')) {
      await deleteComment(commentUser.uid);
      onChange();
    }
  }, [commentUser.uid, onChange]);

  useEffect(() => {
    if (!openEdit) return;
    if (!commentRef?.current) {
      throw new Error('수정 중 문제가 발생했습니다.');
    }
    commentRef.current.value = commentUser.comment;
  }, [commentUser.comment, openEdit]);

  return (
    <div className="my-5">
      <div className="d-flex align-items-center mb-4">
        <Avatar className="me-3" src={commentUser.user.photoURL || COMMON_CONSTANT.DEFAULT_THUMBNAIL} sx={{ width: '4rem', height: '4rem' }} />
        <div className="d-flex flex-column">
          <div className="fw-bold">{commentUser.user.displayName}</div>
          <div className="text-muted">{date}</div>
        </div>
        {!openEdit && currentUser?.uid === commentUser.uid && <DeleteEdit className="ms-auto" onDelete={removeComment} onEdit={() => setOpenEdit(true)} />}
      </div>
      {!openEdit && (
        <div className="pt-2" style={{ borderTop: '1px solid #dfdfdf' }}>
          {commentUser.comment}
        </div>
      )}
      {openEdit && <CommentForm ref={commentRef} buttonName="댓글 수정" onSumbit={editComment} useCancel={true} onCancel={() => setOpenEdit(false)} />}
    </div>
  );
}

export default React.memo(SingleComment);
