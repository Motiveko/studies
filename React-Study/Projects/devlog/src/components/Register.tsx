import React from 'react';
import { useRef } from 'react';
import { FormEvent } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCommon } from '../context/CommonContext';
import CenteredSpinner from './UI/CenteredSpinner';
import ErrorAlert from './UI/ErrorAlert';
import GoogleButton from './UI/Buttons/GoogleButton';

export default function Register() {
  // const { signUp } = useOutletContext();
  const { signUp } = useAuth();
  const { isLoading, setIsLoading, error, setError } = useCommon();
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const { email, password, passwordConfirm } = getRegisterInfo();

    if (!checkPassword(password, passwordConfirm)) {
      return;
    }

    try {
      const userCredentials = await signUp(email, password);
      // userCredentials.user.
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
      setError('입력한 비밀번호가 일치하지 않습니다.');
      return false;
    }
    return true;
  };

  return (
    <>
      <Card style={{ width: '40vw', maxWidth: '350px', minWidth: '250px' }}>
        <Card.Body>
          <Card.Title style={{ textAlign: 'center' }}>회원가입</Card.Title>
          <ErrorAlert error={error} setError={setError} />
          <Form onSubmit={onSubmit}>
            <Form.Group>
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
            {isLoading && <CenteredSpinner />}
            {!isLoading && (
              <>
                <Button type="submit" className="w-100 mt-3" variant="primary">
                  회원가입
                </Button>
                <GoogleButton>구글계정으로 가입하기</GoogleButton>
              </>
            )}
          </Form>
        </Card.Body>
      </Card>
      <div className="text-center mt-2">
        이미 계정이 있으신가요? <Link to="/auth/login">로그인</Link>
      </div>
    </>
  );
}
