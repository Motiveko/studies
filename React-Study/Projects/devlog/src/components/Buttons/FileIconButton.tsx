import React, { CSSProperties } from 'react';
import IconButton from './IconButton';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
type props = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  buttonStyle?: CSSProperties;
};

function FileIconButton({ onChange, buttonStyle }: props) {
  return (
    <IconButton icon={faFolderPlus} style={buttonStyle}>
      <input type="file" onChange={onChange} style={{ opacity: 0, position: 'absolute', left: '-9999px' }} />
    </IconButton>
  );
}

export default React.memo(FileIconButton);
