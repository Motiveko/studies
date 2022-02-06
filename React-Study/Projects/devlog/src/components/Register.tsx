import { useRef } from 'react';
import { FormEvent } from 'react';
import { Button, Card, Form, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCommon } from '../context/CommonContext';

export default function Register() {
  // const { signUp } = useOutletContext();
  const { signUp } = useAuth();
  const { setIsLoading, setError } = useCommon();
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const { email, password, passwordConfirm } = getRegisterInfo();

    if (!checkPassword(password, passwordConfirm)) {
      // TODO : alert
      return;
    }

    try {
      await signUp(email, password);
      navigate('/', { replace: true });
    } catch (e) {
      console.log(e);
      setError('회원가입 정보를 확인해주세요.');
    }
    setIsLoading(false);
  };
  const getRegisterInfo: () => { email: string; password: string; passwordConfirm: string } = () => {
    if (!emailRef.current || !passwordRef.current || !passwordConfirmRef.current) {
      throw new Error('회원가입 폼 생성중 문제가 발생하였습니다.');
    }
    return {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      passwordConfirm: passwordConfirmRef.current.value,
    };
  };
  const checkPassword: (password: string, passwordConfirm: string) => boolean = (password, passwordConfirm) => {
    if (password !== passwordConfirm) {
      // TODO : 경고창 띄우기
      return false;
    }

    return true;
  };

  return (
    <>
      <Card style={{ width: '40vw', maxWidth: '350px', minWidth: '250px' }}>
        <Card.Body>
          <Card.Title style={{ textAlign: 'center' }}>회원가입</Card.Title>
          <Form>
            <Form.Group onSubmit={onSubmit}>
              <Form.Label>이메일</Form.Label>
              <Form.Control ref={emailRef} type="email" placeholder="name@example.com" required />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control ref={passwordRef} type="password" placeholder="비밀번호" required />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control ref={passwordConfirmRef} type="password" placeholder="비밀번호 확인" required />
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
