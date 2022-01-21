import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from 'react-router-dom'
export default function NavbarComponent () {
  return (
    <Navbar bg='light' expand='lg '>
      <Container fluid>
        <Navbar.Brand as={Link} to="/user">
          Motiveko Drive
        </Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to="/user" >Profile</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}