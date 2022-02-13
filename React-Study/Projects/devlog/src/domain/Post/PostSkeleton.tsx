import { Skeleton, Typography } from '@mui/material';
import React from 'react';

function PostSkeleton() {
  return (
    <>
      <div>
        {/* 제목 */}
        <Typography className="w-100" component="div" variant={'h2'}>
          <Skeleton />
        </Typography>
      </div>
      <div>
        {/* 프로필, tag */}
        <Skeleton variant="text" width={240} height={'3rem'} />
        <div className="d-flex">
          <Skeleton variant="circular" className="me-2" width={50} height={30} />
          <Skeleton variant="circular" className="me-2" width={50} height={30} />
          <Skeleton variant="circular" className="me-2" width={50} height={30} />
        </div>
      </div>
      <div className="container mt-5">
        {/* 컨텐츠 */}
        <Skeleton variant="text" width={'80%'} height={30} />
        <Skeleton variant="text" width={'70%'} height={30} />
        <Skeleton variant="text" width={'90%'} height={30} />
        <Skeleton className="mt-3" variant="rectangular" width={'90%'} height={200} />
        <Skeleton variant="text" width={'80%'} height={30} />
        <Skeleton variant="text" width={'70%'} height={30} />
        <Skeleton variant="text" width={'90%'} height={30} />
        <Skeleton className="mt-3" variant="rectangular" width={'100%'} height={200} />
      </div>
    </>
  );
}
export default PostSkeleton;
