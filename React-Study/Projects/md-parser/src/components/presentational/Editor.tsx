import React, { Dispatch } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { DISPLAY_STYLE } from "../../constant";

function Editor( props: { onChange: Dispatch<any>}) {
  const { onChange } = props;
  return (
    <div className="container" style={{width: DISPLAY_STYLE.EDITOR_WIDTH}}>
      <h2>π» λ§ν¬λ€μ΄μ μλ ₯ν΄λ³΄μΈμ!</h2>
      <FloatingLabel label="">
        <Form.Control 
          onChange={(e) => onChange(e.target.value)}
          as="textarea"
          style={{
            height: DISPLAY_STYLE.EDITOR_HEIGHT,
            width: '100%',
            resize: "none"
          }}
          />
      </FloatingLabel>
    </div>
  )
}

export default React.memo(Editor);