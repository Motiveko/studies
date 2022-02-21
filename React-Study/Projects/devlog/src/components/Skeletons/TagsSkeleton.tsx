import React from 'react';
import { Skeleton } from '@mui/material';

export default React.memo(function TagsSkeleton() {
  return (
    <div className="d-flex my-2">
      <Skeleton variant="circular" className="me-2" width={50} height={30} />
      <Skeleton variant="circular" className="me-2" width={50} height={30} />
      <Skeleton variant="circular" className="me-2" width={50} height={30} />
    </div>
  );
});
