import React from "react";
import ReactDOM from "react-dom";

import { Color, Text, Margin } from "@ds.e/react";

import "@ds.e/scss/lib/Utilities.css";
import "@ds.e/scss/lib/Text.css";
import "@ds.e/scss/lib/Margin.css";
import "@ds.e/scss/lib/global.css";

ReactDOM.render(
  <>
    <Color hexCode="#000" />

    <Margin left space="none">
      <Text size="xs">텍스트 컴포넌트 테스트</Text>
    </Margin>
  </>,
  document.querySelector("#root")
);
