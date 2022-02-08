import React, { ChangeEventHandler, MouseEvent, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import UI_CONST from '../constants/ui-constants';
import { faCode, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { uploadImage } from '../firebase/FileService';
import FileIconButton from './UI/Buttons/FileIconButton';
import IconButton from './UI/Buttons/IconButton';
import { useNavigate } from 'react-router-dom';

type Prop = {
  onChange: React.Dispatch<React.SetStateAction<string>>;
};

function MarkdownEditor({ onChange }: Prop) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = async e => {
    e.preventDefault();
    if (!e.target?.files || e.target.files.length === 0) {
      throw new Error('업로드 할 파일을 찾지 못했습니다');
    }
    const downloadURL = await uploadImage(e.target.files[0]);
    addImageRef(downloadURL);
  };

  const addCodeBlock = (e: MouseEvent) => {
    insertText('```\n코드를입력해주세요\n```');
  };

  // 마크다운 에디터의 현재 커서에 이미지 추가
  const addImageRef = (imageUrl: string) => {
    insertText(`![](${imageUrl})`);
  };

  const insertText = (textToInsert: string) => {
    if (!textAreaRef.current) {
      throw new Error('textarea가 존재하지 않습니다');
    }
    const cursor = textAreaRef.current.selectionStart;
    const text = textAreaRef.current.value;
    const textBeforeCursor = text.substring(0, cursor);
    const textAfterCursor = text.substring(cursor, text.length);
    textAreaRef.current.value = `${textBeforeCursor}\n${textToInsert}\n${textAfterCursor}`;
    onChange(textAreaRef.current.value);
  };

  return (
    <div className="container" style={{ width: UI_CONST.EDITOR_WIDTH }}>
      <Form>
        <div className="d-flex mb-2" style={{ height: '2.5rem' }}>
          <textarea
            ref={textAreaRef}
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
            <FileIconButton icon={faFolderPlus} onChange={handleFileChange} />
          </div>
        </div>

        <Form.Control
          onChange={e => onChange(e.target.value)}
          as="textarea"
          ref={textAreaRef}
          style={{
            height: UI_CONST.EDITOR_HEIGHT,
            width: '100%',
            resize: 'none',
          }}
        />
      </Form>
      <div className="d-flex justify-content-end mt-2" style={{ height: '4vh' }}>
        <Button size="sm" variant="dark" onClick={() => navigate(-1)}>
          취소
        </Button>
        <Button className="ms-2" size="sm" variant="success">
          출간하기
        </Button>
      </div>
    </div>
  );
}

export default React.memo(MarkdownEditor);
