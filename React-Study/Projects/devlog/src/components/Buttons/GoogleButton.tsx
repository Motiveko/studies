import React, { MouseEventHandler } from "react";
import { Button, Image } from "react-bootstrap";

type props = {
  children: string | JSX.Element | JSX.Element[] | undefined;
  size?: {
    width: string;
    height: string;
  };
  onClick?: MouseEventHandler | undefined;
};
function GoogleButton({ children, size, onClick }: props) {
  return (
    <Button variant="light" className="w-100 mt-2" onClick={onClick}>
      <Image
        src="/assets/google.png"
        style={{ ...size }}
        alt="google icon"
        className="me-2 p-0"
      />
      {" "}
      {children}
    </Button>
  );
}
GoogleButton.defaultProps = {
  size: { width: "1.25rem", height: "1.25rem" },
  onClick: undefined,
};

export default React.memo(GoogleButton);
