import React, { ChangeEventHandler, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import UI_CONST from '../constants/ui-constants';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import IconInput from './UI/IconButton';

type Prop = {
  onChange: React.Dispatch<React.SetStateAction<string>>;
};
function MarkdownEditor({ onChange }: Prop) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleFileChange: ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault();
    // TODO :  이거 MarkdownEditor (route) 컴포넌트에서 처리해야 할 것 같은데 어떻게 할지, context 쓸 지 propdrilling 할지 생각해보자
    if (!textAreaRef.current) {
      throw new Error('textarea가 존재하지 않습니다');
    }
    // textArea에 문자열 집어넣기 테스트
    const cursor = textAreaRef.current.selectionStart;
    const text = textAreaRef.current.value;
    const textBeforeCursor = text.substring(0, cursor);
    const textAfterCursor = text.substring(cursor, text.length);
    textAreaRef.current.value = textBeforeCursor + '\n![](https://www.flaticon.com/svg/vstatic/svg/3917/3917017.svg?token=exp=1644245857~hmac=724c41c31475b122c2f00dcc740fa70e)\n' + textAfterCursor;
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
          <div className="ms-auto">
            <IconInput icon={faFolderPlus} onChange={handleFileChange} />
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
        <Button size="sm" variant="dark">
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
