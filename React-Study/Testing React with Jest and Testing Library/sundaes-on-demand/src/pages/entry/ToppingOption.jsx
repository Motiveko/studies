import { Col, Form } from "react-bootstrap";

export default function ToppingOption({ name, imagePath, updateItemCount }) {
  const checkboxLabel = <span>{name}</span>;
  const handleChange = (e) => {
    const itemCount = e.target.checked ? 1 : 0;
    updateItemCount(name, itemCount);
  };
  return (
    <Col>
      <img src={`http://localhost:3030/${imagePath}`} alt={`${name} topping`} />
      <Form.Group controlId={`toppings-option-${name}`}>
        <Form.Check
          type="checkbox"
          onChange={handleChange}
          label={checkboxLabel}
        ></Form.Check>
      </Form.Group>
    </Col>
  );
}
