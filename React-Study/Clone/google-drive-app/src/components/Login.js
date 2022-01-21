import { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useGoogle } from "../context/GoogleAuth";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  let navigate = useNavigate();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // const { login } = useAuth();
  const { login } =  useGoogle();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError(null);
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/', { replace: true }); // navigate 이후에 state 변경 코드( ex) setLoading)에러메시지 발생함
    } catch(e) {
      console.log(e);
      setError('Fail to sign in');
      setLoading(false);
    }
  } 

  return (
    <>    
      <Card>
        <Card.Body>
          <Card.Title>
            <h2 className="text-center mb-4">Login</h2>
            <Alert 
              show={!!error}
              dismissible
              variant={'danger'}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control autoComplete="true" type="email" ref={emailRef}/>
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control autoComplete="true" type="password" ref={passwordRef}/>
            </Form.Group>

            <Button disabled={loading} type='submit' className="w-100 mt-3">
              Log In
            </Button>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </Form>
        </Card.Body>

      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign up</Link>
      </div>
    </>
  )
}