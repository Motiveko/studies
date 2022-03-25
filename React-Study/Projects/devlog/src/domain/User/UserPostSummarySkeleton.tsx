import { Skeleton, Typography } from "@mui/material";
import React from "react";
import TagsSkeleton from "../../components/Skeletons/TagsSkeleton";
import UserPostSummaryLayout from "./UserPostSummaryLayout";

function UserPostSummarySkeleton() {
  return (
    <UserPostSummaryLayout>
      <Skeleton
        variant="rectangular"
        style={{ height: "35vw", maxHeight: "450px" }}
      />
      <Typography className="w-100 mt-3" component="div" variant={"h2"}>
        <Skeleton />
      </Typography>
      <Skeleton variant="text" width={"80%"} height={30} />
      <TagsSkeleton />
      <div className="d-flex">
        <Skeleton variant="text" width={"10%"} height={30} />
        <Skeleton className="ms-2" variant="text" width={"11%"} height={30} />
      </div>
    </UserPostSummaryLayout>
  );
}

export default React.memo(UserPostSummarySkeleton);
