import React, { useMemo } from 'react';
import { Card } from 'react-bootstrap';
import { FirebaseTime, Posting } from '../../firebase/PostingService';
import { User } from '../../firebase/UserService';
import { parseDate } from '../../utils/date-utils';
import './PostingCard.css';
type Prop = {
  // thumbnail: string;
  // title: string;
  // description: string;
  // updatedAt: FirebaseTime;
  posting: Posting;
  user: User;
};
function PostingCard({ posting, user }: Prop) {
  const { thumbnail, title, description, updatedAt } = posting;
  const { email, displayName } = useMemo(() => ({ email: user.email, displayName: user.displayName }), [user]);
  const date = useMemo(() => parseDate((updatedAt as FirebaseTime).seconds * 1000), [posting]);

  return (
    <div className="col my-4 d-flex justify-content-center">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={thumbnail || 'assets/thumbnail.png'} style={thumbnailStyle} />
        <Card.Body>
          <Card.Title className="lh-1 fs-6 w-100 text-truncate">{title}</Card.Title>
          <Card.Text
            className="w-100 text-secondary card-description"
            style={{
              height: '4rem',
              padding: '1px',
              lineHeight: '1rem',
              fontSize: '0.9rem',
            }}
            dangerouslySetInnerHTML={{ __html: description }}
          ></Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex lh-1 text-muted" style={{ fontSize: '0.7rem' }}>
          <div>{displayName || email.substring(0, email.indexOf('@'))}</div>
          <div className="ms-auto">{date}</div>
        </Card.Footer>
      </Card>
    </div>
  );
}
const thumbnailStyle = { width: '100%', height: '10rem', background: 'lightgrey' };

export default React.memo(PostingCard);
