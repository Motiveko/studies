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
    <div className="col my-4">
      <Card className="d-flex flex-column" style={{ flexBasis: '25%', flex: 'none' }}>
        <Card.Img variant="top" src={thumbnail || 'assets/thumbnail.png'} style={thumbnailStyle} />
        <Card.Body>
          <Card.Title className="lh-1">{title}</Card.Title>
          <Card.Text
            className="w-100 text-secondary card-description"
            style={{
              height: '3rem',
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
const descriptionStyle = {
  maxWidth: '15rem',
  height: '3.5rem',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};
export default React.memo(PostingCard);
