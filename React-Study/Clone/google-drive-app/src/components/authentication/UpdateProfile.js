import { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CenteredContainer from "./CenteredContainer";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false)

  const { currentUser, updateEmail, updatePassword } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;

    if(password !== passwordConfirm) {
      return setError("Passwords do not match");
    }

    const promises = [];

    if(email !== currentUser.email) {
      promises.push(updateEmail(email));
    }

    if(password) promises.push(updatePassword(password));
    
    setLoading(true);
    
    Promise.all(promises).then(() => {
      navigate('/user');
    })
    .catch((e) =>{
      console.log(e);
      setError('Failed to Update')
      setLoading(false);
    })

  } 
  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <Card.Title>
            <h2 className="text-center mb-4">Update Profile</h2>
            <Alert show={!!error} 
              onClose={() => setError('')} 
              dismissible 
              variant="danger"
            > 
            {error}
            </Alert>
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control autoComplete="username" type="email" ref={emailRef} required defaultValue={currentUser.email} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                autoComplete="new-password" 
                type="password" 
                ref={passwordRef} 
                placeholder="Leave blank to keep the same"/>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control 
                autoComplete="new-password" 
                type="password" 
                ref={passwordConfirmRef} 
                placeholder="Leave blank to keep the same"/>
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100 mt-3">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/user">Cancel</Link>
      </div>
    </CenteredContainer>
  )
}