import React from 'react';
import UI_CONST from '../constants/ui-constants';

type Prop = {
  code: string;
};
function MarkdownPreview({ code }: Prop) {
  return (
    <div className="container" style={{ width: UI_CONST.EDITOR_WIDTH }}>
      <h2>🤓 Preview</h2>
      <div
        style={{
          height: UI_CONST.EDITOR_HEIGHT,
          maxWidth: '45vw',
          padding: '1rem',
          border: '1px solid lightgrey',
          overflow: 'scroll',
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: code }}></div>
      </div>
    </div>
  );
}

export default React.memo(MarkdownPreview);
