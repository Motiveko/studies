import { faTimes } from '@fortawesome/free-solid-svg-icons';
import React, { ChangeEventHandler } from 'react';
import { Image } from 'react-bootstrap';
import FileIconButton from '../../components/UI/Buttons/FileIconButton';
import IconButton from '../../components/UI/Buttons/IconButton';

type Prop = {
  thumbnail: string;
  removeThumbnail: () => void;
  handleChange: ChangeEventHandler<HTMLInputElement>;
};

function ThumbnailEditor({ thumbnail, removeThumbnail, handleChange }: Prop) {
  return (
    <>
      <div className="d-flex">
        <h6 className="me-auto">썸네일 등록</h6>
        {thumbnail && <IconButton icon={faTimes} onClick={removeThumbnail} />}
      </div>
      {thumbnail && <Image src={thumbnail} width="100%" height={height} />}
      {!thumbnail && (
        <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', height, background: '#dedede' }}>
          <FileIconButton buttonStyle={{ width: '70px', height: '4rem', border: '1px solid #999999' }} onChange={handleChange} />
        </div>
      )}
    </>
  );
}
const height = '200px';

export default React.memo(ThumbnailEditor);
