import React, { ChangeEventHandler, useState } from 'react';
import { Button, Image, Modal } from 'react-bootstrap';
import { uploadImage } from '../firebase/FileService';
import FileIconButton from './UI/Buttons/FileIconButton';

function PostingConfirmModal() {
  const [thumbnail, setThumbnail] = useState<string>('');

  // TODO : 파일 업로드 로직 중복 제거하기
  const handleFileChange: ChangeEventHandler<HTMLInputElement> = async e => {
    e.preventDefault();
    if (!e.target?.files || e.target.files.length === 0) {
      throw new Error('업로드 할 파일을 찾지 못했습니다');
    }
    const downloadURL = await uploadImage(e.target.files[0]);
    setThumbnail(downloadURL);
  };

  return (
    <Modal show={true}>
      <Modal.Header>
        <Modal.Title>제목은 뭘로할까요?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>썸네일 등록</h3>
        {thumbnail && <Image src={thumbnail} width="100%" height="230px" />}
        {!thumbnail && (
          <div style={{ width: '100%', height: '230px', background: '#dedede' }}>
            <FileIconButton buttonStyle={{ width: '100px', height: '4rem' }} onChange={handleFileChange} />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-end mt-2" style={{ height: '4vh' }}>
          <Button size="sm" variant="dark">
            취소
          </Button>
          <Button className="ms-2" size="sm" variant="success">
            출간하기
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
export default React.memo(PostingConfirmModal);
