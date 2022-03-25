import React from "react";
import { Skeleton, Typography } from "@mui/material";
import { Card } from "react-bootstrap";

export default function PostingCardSkeleton() {
  return (
    <div className="col my-4 d-flex justify-content-center">
      <Card className="posting-card" style={{ width: "18rem" }}>
        <Skeleton variant="rectangular" width={"100%"} height={"10rem"} />
        <Card.Body style={{ borderTop: "1px solid lightgrey" }}>
          <Card.Title>
            <Typography component="div" variant={"h2"}>
              <Skeleton variant="text" width={"100%"} height={30} />
            </Typography>
          </Card.Title>

          <Skeleton variant="text" width={"80%"} height={"1rem"} />
          <Skeleton variant="text" width={"60%"} height={"1rem"} />
        </Card.Body>
        <Card.Footer
          className="d-flex align-items-center lh-1 text-muted"
          style={{ fontSize: "0.7rem" }}
        >
          <Skeleton variant="circular" width={"1rem"} height={"1rem"} />
          <Skeleton
            className="ms-1"
            variant="text"
            width={"30%"}
            height={"1rem"}
          />
          <Skeleton
            className="ms-auto"
            variant="text"
            width={"15%"}
            height={"1rem"}
          />
        </Card.Footer>
      </Card>
    </div>
  );
}
