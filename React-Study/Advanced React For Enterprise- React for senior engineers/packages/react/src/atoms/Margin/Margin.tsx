import React from "react";
import { Spacing } from "@ds.e/foundation";

interface MarginProps {
  space?: keyof typeof Spacing;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
}

const Margin: React.FunctionComponent<MarginProps> = ({
  space = Spacing.xxxs,
  left,
  right,
  top,
  bottom,
  children,
}) => {
  let className = "";

  if (!left && !right && !top && !bottom) {
    className = `dse-margin-${space}`;
  }
  if (left) {
    className += ` dse-margin-left-${space}`;
  }

  if (right) {
    className += ` dse-margin-right-${space}`;
  }

  if (top) {
    className += ` dse-margin-top-${space}`;
  }

  if (bottom) {
    className += ` dse-margin-bottom-${space}`;
  }

  return <div className={className}>{children}</div>;
};

export default Margin;
