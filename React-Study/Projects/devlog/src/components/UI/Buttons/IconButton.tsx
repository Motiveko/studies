import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
type Prop = {
  icon: IconProp;
  onClick?: React.MouseEventHandler<HTMLLabelElement>;
  children?: JSX.Element | JSX.Element[] | string;
};

function IconButton({ icon, onClick, children }: Prop) {
  return (
    <label className="btn btn-sm mb-2 ms-2" onClick={onClick} style={{ border: '1px solid lightgrey' }}>
      <FontAwesomeIcon icon={icon} />
      {children}
    </label>
  );
}

export default React.memo(IconButton);
