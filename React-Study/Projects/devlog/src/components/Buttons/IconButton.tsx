import React, { CSSProperties } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type props = {
  icon: IconProp;
  onClick?: React.MouseEventHandler<HTMLLabelElement>;
  children?: React.ReactNode;
  style?: CSSProperties;
};

function IconButton({
  icon,
  onClick,
  children,
  style,
}: props) {
  return (
    <label
      onClick={onClick}
      style={{ border: "1px solid lightgrey", marginLeft: "0.5rem", ...style }}
      className="btn d-flex justify-content-center align-items-center"
    >
      <FontAwesomeIcon icon={icon} />
      {children}
    </label>
  );
}
IconButton.defaultProps = {
  onClick: undefined,
  children: null,
  style: {},
};
export default React.memo(IconButton);
