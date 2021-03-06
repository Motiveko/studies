import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SmallProfile from "../../components/SmallProfile";
import { COMMON_CONSTANT } from "../../constants";
import { FirebaseTime, Posting } from "../../service/firebase/PostingService";
import { User } from "../../service/firebase/UserService";
import { parseDate } from "../../utils/date-utils";
import "./PostingCard.css";

type props = {
  posting: Posting;
  user: User;
};
function PostingCard({ posting, user }: props) {
  const {
    uid, thumbnail, title, description, updatedAt,
  } = posting;

  const date = parseDate((updatedAt as FirebaseTime).seconds * 1000);
  const navigate = useNavigate();

  return (
    <div className="col my-4 d-flex justify-content-center">
      <Card
        className="posting-card"
        style={{ width: "18rem" }}
        onClick={() => navigate(`/post/${uid}`)}
      >
        <Card.Img
          variant="top"
          src={thumbnail || COMMON_CONSTANT.DEFAULT_THUMBNAIL}
          style={thumbnailStyle}
        />
        <Card.Body style={{ borderTop: "1px solid lightgrey" }}>
          <Card.Title className="lh-1 fs-6 w-100 text-truncate">
            {title}
          </Card.Title>
          <Card.Text
            className="w-100 text-secondary card-description"
            style={{
              height: "4rem",
              padding: "1px",
              lineHeight: "1rem",
              fontSize: "0.9rem",
            }}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </Card.Body>
        <Card.Footer
          className="d-flex align-items-center lh-1 text-muted"
          style={{ fontSize: "0.7rem" }}
        >
          <SmallProfile user={user} />
          <div className="ms-auto">{date}</div>
        </Card.Footer>
      </Card>
    </div>
  );
}
const thumbnailStyle = {
  width: "100%",
  height: "10rem",
  background: "lightgrey",
};

export default React.memo(PostingCard);
