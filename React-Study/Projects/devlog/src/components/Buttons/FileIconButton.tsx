import React, { CSSProperties } from "react";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import IconButton from "./IconButton";

type props = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  buttonStyle?: CSSProperties;
};

function FileIconButton({ onChange, buttonStyle }: props) {
  return (
    <IconButton icon={faFolderPlus} style={buttonStyle}>
      <input
        type="file"
        onChange={onChange}
        style={{ opacity: 0, position: "absolute", left: "-9999px" }}
      />
    </IconButton>
  );
}
FileIconButton.defaultProps = {
  buttonStyle: {},
};
export default React.memo(FileIconButton);
