import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { DISPLAY_STYLE } from "../../constant";

function Preview({ text }: { text: string }) {
  return (
      <div className="container" style={{width: DISPLAY_STYLE.EDITOR_WIDTH}}>
        <h2>🤓 Preview</h2>
        <div 
          style={{
            height: DISPLAY_STYLE.EDITOR_HEIGHT, 
            maxWidth: '45vw',
            padding: '1rem',
            border: '1px solid lightgrey',
            overflow: 'scroll'
          }}
        >  
          <ReactMarkdown
              children={text} 
              remarkPlugins={[remarkGfm]} 
          />
        </div>
      </div>
  
  )
}

export default React.memo(Preview);