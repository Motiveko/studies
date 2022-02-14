import React, { ForwardedRef, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
type Prop = {
  onSumbit: () => void;
  buttonName?: string;
  placeHolder?: string;
  useCancel?: boolean;
  onCancel?: () => void;
};
export default React.forwardRef(function CommentForm(props: Prop, ref: ForwardedRef<HTMLTextAreaElement>) {
  return (
    <>
      <Form.Control as="textarea" placeholder={props.placeHolder || '댓글을 입력하세요.'} ref={ref} className="my-2" style={{ resize: 'none' }} />
      <div className="text-end">
        {props.useCancel && (
          <Button onClick={props.onCancel} className="me-2" variant="secondary">
            취소
          </Button>
        )}
        <Button onClick={props.onSumbit} variant="success">
          {props.buttonName || '댓글 작성'}
        </Button>
      </div>
    </>
  );
});