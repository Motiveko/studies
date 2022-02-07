import React from 'react';
import { useMemo, useState } from 'react';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import MarkdownEditor from '../components/MarkdownEditor';
import MarkdownPreview from '../components/MarkdownPreview';
import remarkGfm from 'remark-gfm';
// import rehypeFormat from 'rehype-format';
// import { reporter } from 'vfile-reporter';

export default function PostEditor() {
  const [text, setText] = useState('');

  const parsedText = useMemo(() => {
    return unified().use(remarkParse).use(remarkRehype).use(remarkGfm).use(rehypeStringify).use(rehypeHighlight, { ignoreMissing: true }).processSync(text).toString();
  }, [text]);

  return (
    <div className="d-flex align-items-center">
      <MarkdownEditor onChange={setText} />
      <MarkdownPreview code={parsedText} />
    </div>
  );
}
