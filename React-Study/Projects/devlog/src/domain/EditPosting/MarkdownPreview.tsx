import React from 'react';
import UI_CONST from '../../constants/UIConstant';
import './MarkdownPreview.css';

type props = {
  code: string;
};
function MarkdownPreview({ code }: props) {
  return (
    <div className="container" style={{ width: UI_CONST.EDITOR_WIDTH }}>
      <div
        style={{
          height: UI_CONST.PREVIEW_HEIGHT,
          maxWidth: '45vw',
          padding: '1rem',
          border: '1px solid lightgrey',
          borderRadius: '0.2rem',
          overflow: 'scroll',
          backgroundColor: 'white',
        }}
      >
        <div id="preview" dangerouslySetInnerHTML={{ __html: code }}></div>
      </div>
    </div>
  );
}

export default React.memo(MarkdownPreview);
