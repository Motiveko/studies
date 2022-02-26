import React, { CSSProperties, useMemo } from 'react';
import { Image } from 'react-bootstrap';
import { COMMON_CONSTANT } from '../../constants/CommonConstant';
import Tags from '../Post/Tags';
import UserPostSummaryLayout from './UserPostSummaryLayout';
import { FirebaseTime, Posting } from '../../service/firebase/PostingService';
import { User } from '../../service/firebase/UserService';
import { parseDate } from '../../utils/date-utils';
import { useNavigate } from 'react-router-dom';
import { Link } from '@mui/material';

type props = {
  posting: Posting & { commentsCount: number };
  user: User;
  onClickTag: (tag: string) => void;
};
function UserPostSummary({ posting, user, onClickTag }: props) {
  const date = useMemo(() => parseDate((posting.updatedAt as FirebaseTime).seconds * 1000), [posting]);

  const navigate = useNavigate();

  return (
    <>
      <UserPostSummaryLayout>
        <Image src={posting.thumbnail || COMMON_CONSTANT.DEFAULT_THUMBNAIL} style={{ maxHeight: '450px' }} />
        <Link color={'black'} className="mt-3" underline="hover">
          <h2 onClick={() => navigate(`/post/${posting.uid}`)}>{posting.title}</h2>
        </Link>
        {posting.description && <p>{posting.description}</p>}
        <Tags tags={posting.tags} clickable={true} onClick={onClickTag} />
        <div className="text-muted my-4">
          {date} • <span>{posting.commentsCount} 개의 댓글</span>
        </div>
      </UserPostSummaryLayout>
    </>
  );
}
export default React.memo(UserPostSummary);
