import { Chip } from '@mui/material';
import React from 'react';
type props = {
  tags: string[];
  clickable?: boolean;
  onClick?: (tag: string) => void;
};
function Tags({ tags, clickable = false, onClick }: props) {
  return (
    <div className="d-flex mt-3">
      {tags.map((tag, i) => {
        return (
          <Chip
            key={i}
            className="me-2"
            label={tag}
            clickable={clickable}
            onClick={() => {
              if (onClick) {
                onClick(tag);
              }
            }}
          />
        );
      })}
    </div>
  );
}
export default React.memo(Tags);
