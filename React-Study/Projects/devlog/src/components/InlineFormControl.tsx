import React from 'react';

type Prop = {
  children: JSX.Element;
  label: string;
};

function InlineFormControl({ children, label }: Prop) {
  return (
    <div className="mb-3 row">
      <label htmlFor={children.props.id} className="col-sm-2 pe-0">
        {label}
      </label>
      <div className="col-sm-10">{children}</div>
    </div>
  );
}

export default React.memo(InlineFormControl);
