import { Link } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DeleteEdit from '../../components/DeleteEdit';
import SmallProfile from '../../components/SmallProfile';
import { FirebaseTime, Posting } from '../../service/firebase/PostingService';
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
  return (
    <>
      <h1>{posting.title}</h1>
      <div className="d-flex align-items-center">
        {user && <SmallProfile user={user} imageSize={2} />}
        <div className="ms-2 text-muted">{date}</div>
        {isCurrentUser && <DeleteEdit onEdit={() => ({})} onDelete={() => ({})} className="ms-auto" />}
      </div>
    </>
  );
}

export default React.memo(PostHeader);
