import React, { ChangeEventHandler, KeyboardEvent, KeyboardEventHandler, SetStateAction, useCallback, useRef, useState } from 'react';
import { Badge, Button, Form, Modal } from 'react-bootstrap';
import ImageEditor from '../../components/ImageEditor';
import { Posting } from '../../service/firebase/PostingService';
import TransparentTextarea from '../../components/TransparentTextarea';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../../components/Buttons/IconButton';
import { useThumbnail } from '../../hooks/useThumbnail';

type Prop = {
  show: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
  onSubmit: (data: AdditionalData) => void;
};

type AdditionalData = Pick<Posting, 'thumbnail' | 'description' | 'tags'>;

function PostingConfirmModal({ show, setShow, onSubmit }: Prop) {
  const [{ thumbnail, setThumbnail }, upload] = useThumbnail('');

  const descRef = useRef<HTMLTextAreaElement>(null);

  // TODO : 파일 업로드 로직 중복 제거하기
  const handleFileChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    async e => {
      e.preventDefault();
      if (!e.target?.files || e.target.files.length === 0) {
        throw new Error('업로드 할 파일을 찾지 못했습니다');
      }
      upload(e.target.files[0]);
    },
    [upload],
  );

  const removeThumbnail = useCallback(() => setThumbnail(''), [setThumbnail]);

  // tags
  const [tags, setTags] = useState<string[]>([]);

  const removeTag = useCallback(index => setTags(prev => prev.filter((e, i) => i !== index)), []);
  const tagInputRef = useRef<HTMLTextAreaElement>(null);
  const onKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!tagInputRef.current) {
        throw new Error('태그 입력창에 문제가 발생하였습니다.');
      }
      const newTag = tagInputRef.current.value;
      setTags(prev => [...prev, newTag]);
      tagInputRef.current.value = '';
    }
  }, []);

  const uploadPost = () => {
    const additionalData = parseAdditionalData();
    setShow(false);
    onSubmit(additionalData);
  };
  const parseAdditionalData: () => AdditionalData = () => {
    if (!descRef.current) throw new Error('descRef not found');
    return { thumbnail, description: descRef.current.value, tags };
  };

  const prohibitEnter: KeyboardEventHandler = e => {
    if (e.key === 'Enter') e.preventDefault();
  };

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>정보 입력하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex">
          <h6 className="me-auto">썸네일 등록</h6>
          {thumbnail && <IconButton icon={faTimes} onClick={removeThumbnail} />}
        </div>
        <ImageEditor thumbnail={thumbnail || ''} handleChange={handleFileChange} variant="thumbnail" />

        <h6 className="mt-2">포스트 설명</h6>
        <Form.Control as="textarea" onKeyPress={prohibitEnter} ref={descRef} style={{ resize: 'none' }} />

        <div className="d-flex mt-2 align-items-baseline">
          {tags.map((tag, i) => (
            <Badge onClick={() => removeTag(i)} className="mx-1" pill bg="secondary" key={i}>
              {tag} &nbsp; X
            </Badge>
          ))}
          <TransparentTextarea placeholder="태그추가" style={tagStyle} ref={tagInputRef} onKeyPress={onKeyPress} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-end mt-2" style={{ height: '4vh' }}>
          <Button size="sm" variant="dark" onClick={() => setShow(false)}>
            취소
          </Button>
          <Button className="ms-2" size="sm" variant="success" onClick={uploadPost}>
            출간하기
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
const tagStyle = { fontWeight: 'normal', fontSize: '1rem', color: 'grey' };
export default React.memo(PostingConfirmModal);
