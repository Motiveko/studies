import React from "react";
import { DISPLAY_STYLE } from "../../constant";

/**
 * HTML로 파싱된 마크다운을 받아서 화면에 그대로 랜더링한다.
 */
function Preview2({ code }: { code: string }) {
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
      <div dangerouslySetInnerHTML={{__html: code}}></div>
    </div>
  </div>
  )
}

export default React.memo(Preview2);