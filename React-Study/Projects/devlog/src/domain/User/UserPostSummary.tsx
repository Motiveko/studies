import React, { useMemo } from 'react';
import { Image } from 'react-bootstrap';
import { COMMON_CONSTANT } from '../../constants/CommonConstant';
import Tags from '../Post/Tags';
import UserPostSummaryLayout from './UserPostSummaryLayout';
import { FirebaseTime, Posting } from '../../service/firebase/PostingService';
import { User } from '../../service/firebase/UserService';
import { parseDate } from '../../utils/date-utils';

type Prop = {
  posting: Posting & { commentsCount: number };
  user: User;
};
function UserPostSummary({ posting, user }: Prop) {
  const date = useMemo(() => parseDate((posting.updatedAt as FirebaseTime).seconds * 1000), [posting]);
  return (
    <>
      <UserPostSummaryLayout>
        <Image src={posting.thumbnail || COMMON_CONSTANT.DEFAULT_THUMBNAIL} style={{ maxHeight: '450px' }} />
        <h2 className="mt-3">{posting.title}</h2>
        <p>{posting.description}</p>
        <Tags tags={posting.tags} />
        <div className="text-muted my-4">
          {date} • <span>{posting.commentsCount} 개의 댓글</span>
        </div>
      </UserPostSummaryLayout>
    </>
  );
}
export default React.memo(UserPostSummary);
