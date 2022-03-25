import { Chip } from "@mui/material";
import React from "react";

type props = {
  tags: string[];
  clickable?: boolean;
  onClick?: (tag: string) => void | undefined;
};
function Tags({ tags, clickable, onClick }: props) {
  return (
    <div className="d-flex mt-3">
      {tags.map((tag, i) => (
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
      ))}
    </div>
  );
}
Tags.defaultProps = {
  clickable: false,
  onClick: undefined,
};
export default React.memo(Tags);
