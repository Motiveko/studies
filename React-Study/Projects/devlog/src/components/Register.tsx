import { Button, Card, Form, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <>
      <Card style={{ width: '40vw', maxWidth: '350px', minWidth: '250px' }}>
        <Card.Body>
          <Card.Title style={{ textAlign: 'center' }}>회원가입</Card.Title>
          <Form>
            <Form.Group>
              <Form.Label>이메일</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control type="password" placeholder="비밀번호" />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control type="password" placeholder="비밀번호 확인" />
            </Form.Group>
          </Form>

          <Button className="w-100 mt-3" variant="primary">
            회원가입
          </Button>
          <Button variant="light" className="w-100 mt-2">
            <Image src="/assets/google.png" style={{ width: '1.25rem', height: '1.25rem' }} className="me-2 p-0" /> 구글계정으로 가입하기
          </Button>
        </Card.Body>
      </Card>
      <div className="text-center mt-2">
        이미 계정이 있으신가요? <Link to="/auth/login">로그인</Link>
      </div>
    </>
  );
}
