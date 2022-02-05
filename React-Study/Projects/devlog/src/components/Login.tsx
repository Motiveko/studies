import React from 'react';
import { Button, Card, Form, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <>
      <Card style={{ width: '40vw', maxWidth: '350px', minWidth: '250px' }}>
        <Card.Body>
          <Card.Title style={{ textAlign: 'center' }}>로그인</Card.Title>
          <Form>
            <Form.Group>
              <Form.Label>이메일</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control type="password" placeholder="비밀번호" />
            </Form.Group>
          </Form>

          <Button className="w-100 mt-3" variant="primary">
            로그인
          </Button>
          <Button variant="light" className="w-100 mt-2">
            <Image src="/assets/google.png" style={{ width: '1.25rem', height: '1.25rem' }} className="me-2 p-0" /> 구글계정으로 로그인하기
          </Button>
        </Card.Body>
      </Card>
      <div className="text-center mt-2">
        계정이 없으신가요? <Link to="/auth/register">회원가입</Link>
      </div>
    </>
  );
}

export default React.memo(Login);
