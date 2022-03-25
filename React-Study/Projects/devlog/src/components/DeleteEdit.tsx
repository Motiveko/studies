import React from "react";

type props = {
  onEdit: () => void;
  onDelete: () => void;
  className: string;
};
function DeleteEdit({ onEdit, onDelete, className = "" }: props) {
  return (
    <div className={`text-muted ${className}`}>
      <span className="me-2" onClick={onEdit} style={{ cursor: "pointer" }}>
        수정
      </span>
      <span onClick={onDelete} style={{ cursor: "pointer" }}>
        삭제
      </span>
    </div>
  );
}

export default React.memo(DeleteEdit);
