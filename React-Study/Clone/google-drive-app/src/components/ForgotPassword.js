import { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState();
  const { resetPassword } = useAuth();

  const emailRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('')
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions');
    } catch(e) {
      console.log(e);
      setError('Failed to Reset Password');
    }
    setLoading(false)
  }
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <h2 className="text-center mb-4">Password Reset</h2>
          <Alert show={!!error} variant="danger" dismissible onClose={() => setError('')} >{error}</Alert>
          <Alert show={!!message} variant="success" dismissible onClose={() => setMessage('')} >{message}</Alert>
        </Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control ref={emailRef} type="email" required />
          </Form.Group>
          <Button disabled={loading} type='submit' className="w-100 mt-3">Reset Password</Button>
        </Form>
        <div className="text-center mt-3">
          <Link to="/login">Login</Link>
        </div>
      </Card.Body>
    </Card>
  )
}