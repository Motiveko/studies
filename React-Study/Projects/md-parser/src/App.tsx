import React, { Dispatch, useState } from 'react';
import ReactMarkdown from 'react-markdown'

import remarkGfm from 'remark-gfm';

const markdown = `
# 제목

### 샵세개

***안녕하세요***

> 인용문 안녕하세요 제이름은 고동기입니다..

[이거 네이버링크](https://naver.com)
# GFM

## Autolink literals

www.example.com, https://example.com, and contact@example.com.

## Footnote

A note[^1]

[^1]: Big note.

## Strikethrough

~one~ or ~~two~~ tildes.

## Table

| a | b  |  c |  d  |
| - | :- | -: | :-: |

## Tasklist

* [ ] to do
* [x] done

코드블럭은 어떻게넣지?

`
function App() {
  const [text, setText] = useState('');
    console.log(text)
  return (
    <>
      <header>

      </header>
      <Editor onChange={setText} />
      <ReactMarkdown 
        children={text} 
        remarkPlugins={[remarkGfm]} 
      />
    </>
  );
}

export default App;

function Editor( props: { onChange: Dispatch<any>}) {
  const { onChange } = props;

  return (
    <textarea 
      onChange={(e) => onChange(e.target.value)} 
      id="editor" 
      cols={30} 
      rows={10}>
    </textarea>
  )
}