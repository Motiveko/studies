import React from 'react';
import { useMemo, useState } from 'react';

import MarkdownEditor from '../../components/MarkdownEditor';
import MarkdownPreview from '../../components/MarkdownPreview';

import { parseText } from '../../utils/markdown-parser-util';

export default function PostEditor() {
  const [text, setText] = useState('');

  const parsedText = useMemo(() => {
    return parseText(text);
  }, [text]);

  return (
    <>
      <div
        className="d-flex align-items-stretch"
        //  style={{ height: '89vh' }}
      >
        <MarkdownEditor onChange={setText} />
        <MarkdownPreview code={parsedText} />
      </div>
    </>
  );
}
