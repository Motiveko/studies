import Editor from "../presentational/Editor";
import { useEffect, useMemo, useRef, useState } from "react";
import Preview from "../presentational/Preview";
import { unified } from 'unified';
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
// import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import Preview2 from "../presentational/Preview2";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import github from "remark-github"

export default function ParserContainer() {
  const [text, setText] = useState('');
  
  const parsedText = useMemo(() => {
    return unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(github,{
        repository: 'https://github.com/rhysd/rehype-react',
      })
      // .use(rehypeSanitize)
      .use(remarkGfm)
      .use(rehypeStringify)
      .use(rehypeHighlight, {
        ignoreMissing: true
      }) // 이걸 쓰면 코드블록 내용에 keyword,number,params 등의 클래스가 붙어서 분리된다.
      .processSync(text).toString();
  }, [text]);

  
  return (
    <div className="d-flex align-items-center" style={{height: '100vh'}}>
      <Editor onChange={setText} />
      <div>➡</div>
      {/* <Preview text={text} /> */}
      <Preview2 code={parsedText} />
    </div>
  );
}