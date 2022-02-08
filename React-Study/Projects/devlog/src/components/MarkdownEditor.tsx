import React, { ChangeEventHandler, FormEvent, MouseEvent, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import UI_CONST from '../constants/ui-constants';
import { faCode, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { uploadImage } from '../firebase/FileService';
import FileIconButton from './UI/Buttons/FileIconButton';
import IconButton from './UI/Buttons/IconButton';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { uploadPosting } from '../firebase/PostingService';
import PostingConfirmModal from './PostingConfirmModal';

type Prop = {
  onChange: React.Dispatch<React.SetStateAction<string>>;
};

function MarkdownEditor({ onChange }: Prop) {
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(event);

    const { title, content } = getFormValue();
    const uid = searchParams.get('id');
    const userId = currentUser!.uid;

    const result = await uploadPosting({ uid, userId, title, content });
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
      <Form onSubmit={handleSubmit}>
        <div className="d-flex mb-2" style={{ height: '2.5rem' }}>
          <textarea
            ref={titleRef}
            placeholder="제목을 입력하세요"
            style={{
              background: 'transparent',
              display: 'block',
              padding: '0px',
              fontSize: '1.75rem',
              width: '100%',
              resize: 'none',
              // lineHeight: '1',
              outline: 'none',
              border: 'none',
              fontWeight: 'bold',
            }}
          ></textarea>
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
          <Button className="ms-2" type="submit" size="sm" variant="success">
            출간하기
          </Button>
        </div>
      </Form>
      <PostingConfirmModal />
    </div>
  );
}

export default React.memo(MarkdownEditor);
