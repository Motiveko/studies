import React, { ChangeEventHandler, CSSProperties, ForwardedRef } from "react";
import PropTypes from "prop-types";

type props = {
  placeholder: string;
  style?: CSSProperties;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLTextAreaElement>;
};

const TransparentTextarea = React.forwardRef(
  (props: props, ref: ForwardedRef<HTMLTextAreaElement>) => {
    const { placeholder, style, onChange, onKeyPress } = props;
    return (
      <textarea
        ref={ref}
        placeholder={placeholder}
        style={{
          background: "transparent",
          display: "block",
          padding: "0px",
          fontSize: "1.75rem",
          width: "100%",
          resize: "none",
          outline: "none",
          border: "none",
          fontWeight: "bold",
          ...style,
        }}
        onKeyPress={onKeyPress}
        onChange={onChange}
      ></textarea>
    );
  }
);
TransparentTextarea.propTypes = {
  placeholder: PropTypes.string.isRequired,
};
// fowardRef 내부에 정의된 함수가 익명함수로 되어있으면 리액트에서는 함수 이름을 알지 못한다고한다. 디버그 용도로 필요한 컴포넌트명
TransparentTextarea.displayName = "TransparentTextarea";

export default React.memo(TransparentTextarea);
