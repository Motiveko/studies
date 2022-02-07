import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
type Prop = {
  icon: IconProp;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

function IconInput({ icon, onChange }: Prop) {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <label className="btn btn-outline-dark mb-2">
      <FontAwesomeIcon icon={icon} />
      <input type="file" ref={fileRef} onChange={onChange} style={{ opacity: 0, position: 'absolute', left: '-9999px' }} />
    </label>
  );
}

export default React.memo(IconInput);
