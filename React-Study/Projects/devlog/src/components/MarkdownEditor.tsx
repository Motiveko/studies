import React, { ChangeEventHandler } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import UI_CONST from '../constants/ui-constants';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import IconInput from './UI/IconButton';

type Prop = {
  onChange: React.Dispatch<React.SetStateAction<string>>;
};
function MarkdownEditor({ onChange }: Prop) {
  const handleFileChange: ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault();
    // TODO :  이거 MarkdownEditor (route) 컴포넌트에서 처리해야 할 것 같은데 어떻게 할지, context 쓸 지 propdrilling 할지 생각해보자

    alert('누가 기침소리를 내었느냐?');
  };
  return (
    <div className="container" style={{ width: UI_CONST.EDITOR_WIDTH }}>
      <Form>
        <div className="d-flex justify-content-end mb-2">
          <IconInput icon={faFolderPlus} onChange={handleFileChange} />
        </div>
        <FloatingLabel label="">
          <Form.Control
            onChange={e => onChange(e.target.value)}
            as="textarea"
            style={{
              height: UI_CONST.EDITOR_HEIGHT,
              width: '100%',
              resize: 'none',
            }}
          />
        </FloatingLabel>
      </Form>
    </div>
  );
}

export default React.memo(MarkdownEditor);
