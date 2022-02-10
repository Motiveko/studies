import React, { FormEvent, useRef } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCommon } from '../context/CommonContext';
import CenteredSpinner from '../components/CenteredSpinner';
import GoogleButton from '../components/Buttons/GoogleButton';

function Login() {
  const { login } = useAuth();
  const { isLoading, setIsLoading, error, setError } = useCommon();
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const { email, password } = getLoginInfo();

    try {
      await login(email, password);
      navigate('/', { replace: true });
    } catch (e) {
      console.log(e);
      setError('이메일, 비밀번호를 확인해주세요.');
    }

    setIsLoading(false);
  };

  const getLoginInfo = () => {
    if (!emailRef.current || !passwordRef.current) {
      throw new Error('로그인 폼 생성중 문제가 발생하였습니다.');
    }
    return {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
  };
  return (
    <>
      <Card style={{ width: '40vw', maxWidth: '350px', minWidth: '250px' }}>
        <Card.Body>
          <Card.Title style={{ textAlign: 'center' }}>로그인</Card.Title>
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>이메일</Form.Label>
              <Form.Control ref={emailRef} type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control ref={passwordRef} type="password" placeholder="비밀번호" />
            </Form.Group>
            <>
              {isLoading && <CenteredSpinner />}
              {!isLoading && (
                <>
                  <Button type="submit" className="w-100 mt-3" variant="primary">
                    로그인
                  </Button>
                  <GoogleButton>구글계정으로 로그인하기</GoogleButton>
                </>
              )}
            </>
          </Form>
        </Card.Body>
      </Card>
      <div className="text-center mt-2">
        계정이 없으신가요? <Link to="/auth/register">회원가입</Link>
      </div>
    </>
  );
}

export default React.memo(Login);
