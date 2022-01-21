import { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CenteredContainer from "./CenteredContainer";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false)

  const { signup, currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError('Psswords do not match');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch(e) {
      console.error(e)
      setError('Fail to create an account');
    }
    setLoading(false);
  } 
  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <Card.Title>
            <h2 className="text-center mb-4">Sign up</h2>
            <Alert show={!!error} 
              onClose={() => setError('')} 
              dismissible variant="danger"
            > 
            {error}
            </Alert>
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control autoComplete="username" type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control autoComplete="new-password" type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control autoComplete="new-password" type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100 mt-3">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login"> Log In</Link>
      </div>
    </CenteredContainer>
  )
}