import { faTimes } from '@fortawesome/free-solid-svg-icons';
import React, { ChangeEventHandler, CSSProperties, MouseEventHandler } from 'react';
import { Image, Spinner } from 'react-bootstrap';
import FileIconButton from './Buttons/FileIconButton';
import IconButton from './Buttons/IconButton';

type props = {
  variant: 'thumbnail' | 'avatar';
  thumbnail: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  isLoading?: boolean;
  onRemove?: MouseEventHandler<HTMLLabelElement>;
};

function ImageEditor({ variant, thumbnail, handleChange, isLoading, onRemove }: props) {
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
      {thumbnail && (
        <div className="d-flex align-items-center">
          <Image fluid={true} src={thumbnail} style={imageStyle} />
          {variant === 'avatar' && <IconButton icon={faTimes} style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%' }} onClick={onRemove} />}
        </div>
      )}
      {!thumbnail && (
        <div className="d-flex">
          <div className="d-flex justify-content-center align-items-center" style={imageStyle}>
            {!isLoading && <FileIconButton buttonStyle={{ margin: '0', border: 'none', ...fileIconButtonStyle }} onChange={handleChange} />}
            {isLoading && <Spinner animation="border" />}
          </div>
        </div>
      )}
    </>
  );
}

export default React.memo(ImageEditor);
