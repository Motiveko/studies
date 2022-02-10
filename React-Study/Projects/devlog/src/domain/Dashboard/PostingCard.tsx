import React, { useMemo } from 'react';
import { Card } from 'react-bootstrap';
import { FirebaseTime } from '../../firebase/PostingService';
import { parseDate } from '../../utils/date-utils';
import './PostingCard.css';
type Prop = {
  thumbnail: string;
  title: string;
  description: string;
  updatedAt: FirebaseTime;
};
function PostingCard({ thumbnail, title, description, updatedAt }: Prop) {
  const date = useMemo(() => parseDate(updatedAt.seconds * 1000), [updatedAt]);

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
        <Card.Footer className="text-sm-end lh-1 text-muted" style={{ fontSize: '0.7rem' }}>
          {date}
        </Card.Footer>
      </Card>
    </div>
  );
}
const thumbnailStyle = { width: '100%', height: '10rem', background: 'lightgrey' };

export default React.memo(PostingCard);
