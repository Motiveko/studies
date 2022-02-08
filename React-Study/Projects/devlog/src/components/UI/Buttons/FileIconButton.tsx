import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import IconButton from './IconButton';
type Prop = {
  icon: IconProp;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

function FileIconButton({ icon, onChange }: Prop) {
  return (
    <IconButton icon={icon}>
      <input type="file" onChange={onChange} style={{ opacity: 0, position: 'absolute', left: '-9999px' }} />
    </IconButton>
  );
}

export default React.memo(FileIconButton);
