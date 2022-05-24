import React from "react";
import ReactDOM from "react-dom";

import { Color, Text, Margin, Select } from "@ds.e/react";

import "@ds.e/scss/lib/Utilities.css";
import "@ds.e/scss/lib/Text.css";
import "@ds.e/scss/lib/Margin.css";
import "@ds.e/scss/lib/global.css";
import "@ds.e/scss/lib/Select.css";

const options = [
  {
    label: "Strict Black",
    value: "strict-black",
  },
  {
    label: "Heavenly Green",
    value: "heavenly-green",
  },
  {
    label: "Sweet Pink",
    value: "pink",
  },
];
ReactDOM.render(
  <>
    <Color hexCode="#000" />
    <div style={{ padding: "40px" }}>
      <Select options={options} />
      <Margin left space="lg">
        <Text size="xs">Text Component</Text>
      </Margin>
    </div>
  </>,
  document.querySelector("#root")
);
