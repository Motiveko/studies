import remarkGfm from "remark-gfm";
import ReactMarkdown from 'react-markdown';
import Editor from "../presentational/Editor";
import { useState } from "react";
import Preview from "../presentational/Preview";

export default function ParserContainer() {
  const [text, setText] = useState('');
  return (
    <div className="d-flex align-items-center" style={{height: '100vh'}}>
      <Editor onChange={setText} />
      <div>➡</div>
      <Preview text={text} />
    </div>
  );
}