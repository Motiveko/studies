import React, { useMemo } from 'react';
import UI_CONST from '../../constants/UIConstant';
import { usePost } from '../../context/PostContext';
import { parseText } from '../../utils/markdown-parser-util';
import './MarkdownPreview.css';

function MarkdownPreview() {
  // md -> html
  const { posting } = usePost();
  const code = useMemo(() => {
    return parseText(posting.content || '');
  }, [posting.content]);
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
