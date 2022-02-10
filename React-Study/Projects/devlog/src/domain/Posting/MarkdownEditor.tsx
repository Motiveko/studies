import React, { ChangeEventHandler, FormEvent, MouseEvent, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import UI_CONST from '../../constants/ui-constants';
import { faCode, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { uploadImage } from '../../firebase/FileService';
import FileIconButton from '../../components/Buttons/FileIconButton';
import IconButton from '../../components/Buttons/IconButton';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Posting, uploadPosting } from '../../firebase/PostingService';
import PostingConfirmModal from './PostingConfirmModal';
import TransparentTextarea from '../../components/TransparentTextarea';

type Prop = {
  onChange: React.Dispatch<React.SetStateAction<string>>;
};

function MarkdownEditor({ onChange }: Prop) {
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const handleFileChange: ChangeEventHandler<HTMLInputElement> = async e => {
    e.preventDefault();
    if (!e.target?.files || e.target.files.length === 0) {
      throw new Error('업로드 할 파일을 찾지 못했습니다');
    }
    const downloadURL = await uploadImage(e.target.files[0]);
    _addImageRef(downloadURL);
  };

  const addCodeBlock = (e: MouseEvent) => {
    _insertText('```\n코드를입력해주세요\n```');
  };

  // 마크다운 에디터의 현재 커서에 이미지 추가
  const _addImageRef = (imageUrl: string) => {
    _insertText(`![](${imageUrl})`);
  };

  const _insertText = (textToInsert: string) => {
    if (!contentRef.current) {
      throw new Error('textarea가 존재하지 않습니다');
    }
    const cursor = contentRef.current.selectionStart;
    const text = contentRef.current.value;
    const textBeforeCursor = text.substring(0, cursor);
    const textAfterCursor = text.substring(cursor, text.length);
    contentRef.current.value = `${textBeforeCursor}\n${textToInsert}\n${textAfterCursor}`;
    onChange(contentRef.current.value);
  };

  const uploadPost = async ({ thumbnail, description, tags }: Pick<Posting, 'thumbnail' | 'description' | 'tags'>) => {
    const { title, content } = getFormValue();
    const uid = searchParams.get('id');
    const userId = currentUser!.uid;

    const result = await uploadPosting({ uid, userId, title, content, thumbnail, description, tags });
    if (result) {
      console.log(result);
    }
  };

  const getFormValue = () => {
    if (!titleRef.current || !contentRef.current) {
      throw new Error('폼 생성에 실패했습니다');
    }
    return { title: titleRef.current.value, content: contentRef.current.value };
  };

  return (
    <div className="container" style={{ width: UI_CONST.EDITOR_WIDTH }}>
      <Form>
        <div className="d-flex mb-2" style={{ height: '2.5rem' }}>
          <TransparentTextarea placeholder="제목을 입력하세요" ref={titleRef} />
          <div className="ms-auto d-flex">
            <IconButton icon={faCode} onClick={addCodeBlock} />
            <FileIconButton onChange={handleFileChange} />
          </div>
        </div>

        <Form.Control
          onChange={e => onChange(e.target.value)}
          as="textarea"
          ref={contentRef}
          placeholder="내용을 입력하세요."
          style={{
            height: UI_CONST.EDITOR_HEIGHT,
            width: '100%',
            resize: 'none',
          }}
        />
        <div className="d-flex justify-content-end mt-2" style={{ height: '4vh' }}>
          <Button size="sm" variant="dark" onClick={() => navigate(-1)}>
            취소
          </Button>
          <Button className="ms-2" onClick={() => setShowModal(true)} size="sm" variant="success">
            출간하기
          </Button>
        </div>
      </Form>
      <PostingConfirmModal show={showModal} setShow={setShowModal} onSubmit={uploadPost} />
    </div>
  );
}

export default React.memo(MarkdownEditor);
