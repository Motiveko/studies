import { Link } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteEdit from '../../components/DeleteEdit';
import SmallProfile from '../../components/SmallProfile';
import { useCommon } from '../../context/CommonContext';
import { deletePosting, FirebaseTime, Posting } from '../../service/firebase/PostingService';
import { User } from '../../service/firebase/UserService';
import { parseDate } from '../../utils/date-utils';

type Prop = {
  posting: Posting;
  user: User;
  isCurrentUser: boolean;
};
function PostHeader({ posting, user, isCurrentUser }: Prop) {
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    setDate(parseDate((posting.updatedAt as FirebaseTime).seconds * 1000));
  }, []);

  const navigate = useNavigate();
  const { setGlobalLoading } = useCommon();
  const deletePost = useCallback(async () => {
    if (confirm('포스트를 진짜로 삭제하시겠습니까?')) {
      setGlobalLoading(true);
      await deletePosting(posting.uid);
      setGlobalLoading(false);

      alert('포스트를 삭제하였습니다.');
      navigate('/');
    }
  }, []);

  return (
    <>
      <h1>{posting.title}</h1>
      <div className="d-flex align-items-center">
        {user && <SmallProfile user={user} imageSize={2} />}
        <div className="ms-2 text-muted">{date}</div>
        {isCurrentUser && <DeleteEdit onEdit={() => ({})} onDelete={deletePost} className="ms-auto" />}
      </div>
    </>
  );
}

export default React.memo(PostHeader);
