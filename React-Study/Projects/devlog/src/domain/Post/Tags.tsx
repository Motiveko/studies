import { Chip } from '@mui/material';
import React from 'react';
type Prop = {
  tags: string[];
};
function Tags({ tags }: Prop) {
  return (
    <div className="d-flex mt-3">
      {tags.map((tag, i) => {
        return <Chip key={i} className="me-2" label={tag} />;
      })}
    </div>
  );
}
export default React.memo(Tags);
