import React, { useRef, FormEvent, useCallback } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import CenteredSpinner from "../../components/CenteredSpinner";
import GoogleButton from "../../components/Buttons/GoogleButton";
import AlertSnackbar from "../../components/Snackbars/AlertSnackbar";
import { actions } from "../../store/auth";
import useAuth from "../../store/auth/useAuth";

export default function Register() {
  const { loading, error, dispatch } = useAuth();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { email, password, passwordConfirm } = getRegisterInfo();

    if (!checkPassword(password, passwordConfirm)) {
      dispatch(actions.setError("비밀번호값이 일치하지 않습니다. 입력값을 확인해주세요"));
      return;
    }

    dispatch(actions.trySignUp({ email, password }));
  };

  const getRegisterInfo: () => {
    email: string;
    password: string;
    passwordConfirm: string;
  } = () => {
    if (
      !emailRef.current
      || !passwordRef.current
      || !passwordConfirmRef.current
    ) {
      throw new Error("회원가입 폼 생성중 문제가 발생하였습니다.");
    }
    return {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      passwordConfirm: passwordConfirmRef.current.value,
    };
  };

  const checkPassword: (
    password: string,
    passwordConfirm: string
  ) => boolean = (password, passwordConfirm) => {
    if (password !== passwordConfirm) {
      setError("입력한 비밀번호가 일치하지 않습니다.");
      return false;
    }
    return true;
  };

  const setError = useCallback((error: string) => {
    dispatch(actions.setError(error));
  }, [dispatch]);
  return (
    <>
      <Card style={{ width: "40vw", maxWidth: "350px", minWidth: "250px" }}>
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>회원가입</Card.Title>
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>이메일</Form.Label>
              <Form.Control
                ref={emailRef}
                type="email"
                placeholder="name@example.com"
                required
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                ref={passwordRef}
                type="password"
                placeholder="비밀번호"
                required
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control
                ref={passwordConfirmRef}
                type="password"
                placeholder="비밀번호 확인"
                required
              />
            </Form.Group>
            {loading && <CenteredSpinner />}
            {!loading && (
              <>
                <Button type="submit" className="w-100 mt-3" variant="primary">
                  회원가입
                </Button>
                <GoogleButton onClick={() => dispatch(actions.tryGoogleAuth())}>
                  구글계정으로 시작하기
                </GoogleButton>
              </>
            )}
          </Form>
        </Card.Body>
      </Card>
      <div className="text-center mt-2">
        이미 계정이 있으신가요?
        {' '}
        <Link to="/auth/login">로그인</Link>
      </div>
      {error && (
        <AlertSnackbar
          type="error"
          message={error}
          onClose={() => setError('')}
        />
      )}
    </>
  );
}
