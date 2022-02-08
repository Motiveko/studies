import React, { CSSProperties } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
type Prop = {
  icon: IconProp;
  onClick?: React.MouseEventHandler<HTMLLabelElement>;
  children?: JSX.Element | JSX.Element[] | string;
  style?: CSSProperties;
};

function IconButton({ icon, onClick, children, style }: Prop) {
  return (
    <label className="btn mb-2 ms-2 d-flex justify-content-center align-items-center" onClick={onClick} style={{ border: '1px solid lightgrey', ...style }}>
      <FontAwesomeIcon icon={icon} />
      {children}
    </label>
  );
}

export default React.memo(IconButton);
