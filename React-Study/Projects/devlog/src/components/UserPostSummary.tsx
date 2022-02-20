import React, { useMemo } from 'react';
import { Image } from 'react-bootstrap';
import { COMMON_CONSTANT } from '../constants/CommonConstant';
import Tags from '../domain/Post/Tags';
import { FirebaseTime, Posting } from '../service/firebase/PostingService';
import { User } from '../service/firebase/UserService';
import { parseDate } from '../utils/date-utils';
import CustomHR from './CustomHR';

type Prop = {
  posting: Posting & { commentsCount: number };
  user: User;
};
function UserPostSummary({ posting, user }: Prop) {
  const date = useMemo(() => parseDate((posting.updatedAt as FirebaseTime).seconds * 1000), [posting]);
  return (
    <>
      <div className="d-flex flex-column w-100" style={{ maxHeight: '650px', marginBottom: '5rem' }}>
        <Image src={posting.thumbnail || COMMON_CONSTANT.DEFAULT_THUMBNAIL} height={'70%'} />
        <h2 className="mt-3">{posting.title}</h2>
        <p>{posting.description}</p>
        <Tags tags={posting.tags} />
        <div className="text-muted my-4">
          {date} / <span className="ms-3"> {posting.commentsCount} 개의 댓글</span>
        </div>
        <CustomHR />
      </div>
    </>
  );
}
export default React.memo(UserPostSummary);
