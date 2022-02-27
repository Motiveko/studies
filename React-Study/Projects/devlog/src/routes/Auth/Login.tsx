import React, { FormEvent, useRef } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCommon } from '../../context/CommonContext';
import CenteredSpinner from '../../components/CenteredSpinner';
import GoogleButton from '../../components/Buttons/GoogleButton';
import AlertSnackbar from '../../components/Snackbars/AlertSnackbar';

function Login() {
  const { login, authWithGoogle } = useAuth();
  const { localLoading, setLocalLoading, error, setError } = useCommon();
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { email, password } = getLoginInfo();
    if (!email || !password) {
      setError('이메일/비밀번호는 필수값입니다!');
      return;
    }
    setLocalLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (e) {
      console.log(e);
      setError('이메일, 비밀번호를 확인해주세요.');
    }

    setLocalLoading(false);
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
              <Form.Control ref={emailRef} type="email" placeholder="name@example.com" required />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control ref={passwordRef} type="password" placeholder="비밀번호" required />
            </Form.Group>
            <>
              {localLoading && <CenteredSpinner />}
              {!localLoading && (
                <>
                  <Button type="submit" className="w-100 mt-3" variant="primary">
                    로그인
                  </Button>
                  <GoogleButton onClick={authWithGoogle}>구글계정으로 시작하기</GoogleButton>
                </>
              )}
            </>
          </Form>
        </Card.Body>
      </Card>
      <div className="text-center mt-2">
        계정이 없으신가요? <Link to="/auth/register">회원가입</Link>
      </div>
      {error && <AlertSnackbar type="error" message={error} onClose={() => setError('')} />}
    </>
  );
}

export default React.memo(Login);
