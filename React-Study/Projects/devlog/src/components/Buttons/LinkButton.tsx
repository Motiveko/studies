import React from "react";
import { Link } from "react-router-dom";

type props = {
  to: string;
  children: React.ReactNode;
  variant: Variant;
};

type Variant = "dark" | "outline-dark";

function LinkButton({ to, children, variant }: props) {
  const style = {
    borderRadius: "30px",
    color: variant === "dark" ? "white" : "dark",
  };

  const className = ["btn", `btn-sm`, `btn-${variant}`];
  return (
    <Link to={to} className={className.join(" ")} style={style}>
      {children}
    </Link>
  );
}

export default React.memo(LinkButton);
