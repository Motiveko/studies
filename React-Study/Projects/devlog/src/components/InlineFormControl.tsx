import React from "react";

type props = {
  children: React.ReactElement;
  label: string;
  prefix?: string;
};

function InlineFormControl({ children, label, prefix }: props) {
  return (
    <div className="mb-3 row">
      <label htmlFor={children.props.id} className="col-sm-2 pe-0">
        {label}
      </label>
      <div className="col-sm-10">
        <div className="input-group">
          {prefix && <div className="input-group-text">{prefix}</div>}
          {children}
        </div>
      </div>
    </div>
  );
}

export default React.memo(InlineFormControl);
