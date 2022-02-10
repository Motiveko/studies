import { faTimes } from '@fortawesome/free-solid-svg-icons';
import React, { ChangeEventHandler, CSSProperties } from 'react';
import { Image } from 'react-bootstrap';
import FileIconButton from './Buttons/FileIconButton';
import IconButton from './Buttons/IconButton';

type Prop = {
  thumbnail: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  variant: 'thumbnail' | 'avatar';
};

function ImageButton({ thumbnail, handleChange, variant }: Prop) {
  let imageStyle: CSSProperties | undefined;
  let fileIconButtonStyle: CSSProperties | undefined;
  switch (variant) {
    case 'avatar':
      imageStyle = { width: '3rem', height: '3rem', borderRadius: '50%', background: '#dedede' };
      fileIconButtonStyle = { width: '1rem', height: '1rem', borderRadius: '50%' };
      break;
    case 'thumbnail':
    default:
      imageStyle = { width: '100%', height: '220px', background: '#dedede' };
      fileIconButtonStyle = { width: '70px', height: '4rem', border: '1px solid #999999' };
  }

  return (
    <>
      {thumbnail && <Image fluid={true} src={thumbnail} style={imageStyle} />}
      {!thumbnail && (
        <div className="d-flex justify-content-center align-items-center" style={imageStyle}>
          <FileIconButton buttonStyle={{ margin: '0', ...fileIconButtonStyle }} onChange={handleChange} />
        </div>
      )}
    </>
  );
}

export default React.memo(ImageButton);
