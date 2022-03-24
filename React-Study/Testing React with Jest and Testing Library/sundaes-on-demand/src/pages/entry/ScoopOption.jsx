import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

export default function ScoopOtion({ name, imagePath, updateItemCount }) {
  const [isInvalid, setIsInvalid] = useState(false);
  const handleChange = (e) => {
    const inputValue = e.target.value;
    const floatInputValue = parseFloat(inputValue);
    const isInvalid =
      floatInputValue < 0 ||
      floatInputValue > 10 ||
      !Number.isInteger(floatInputValue);

    setIsInvalid(isInvalid);
    isInvalid || updateItemCount(name, inputValue);
  };
  return (
    <Col xs={12} sm={6} md={4} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            isInvalid={isInvalid}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
