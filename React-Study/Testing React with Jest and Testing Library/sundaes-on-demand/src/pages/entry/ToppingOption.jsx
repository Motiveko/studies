import { Col } from "react-bootstrap";

export default function ToppingOption({ name, imagePath }) {
  return (
    <Col>
      <img src={`http://loaclhost:3030/${imagePath}`} alt={`${name} topping`} />
    </Col>
  );
}
