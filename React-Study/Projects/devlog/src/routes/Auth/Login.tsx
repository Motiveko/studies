import React, { FormEvent, useRef } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import CenteredSpinner from "../../components/CenteredSpinner";
import GoogleButton from "../../components/Buttons/GoogleButton";
import AlertSnackbar from "../../components/Snackbars/AlertSnackbar";
import { RootState } from "../../store/store";
import { actions } from "../../store/auth";

function Login() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(
    ({
      auth: {
        user,
        loading,
        error,
      },
    }: RootState) => ({ user, loading, error }),
    shallowEqual,
  );

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { email, password } = getLoginInfo();
    if (!email || !password) {
      dispatch(actions.setError("이메일/비밀번호는 필수값입니다!"));
    }

    dispatch(actions.tryLogin({ email, password }));
  };

  const getLoginInfo = () => {
    if (!emailRef.current || !passwordRef.current) {
      throw new Error("로그인 폼 생성중 문제가 발생하였습니다.");
    }
    return {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
  };

  const onCloseError = () => {
    dispatch(actions.setError(""));
  };
  return (
    <>
      <Card style={{ width: "40vw", maxWidth: "350px", minWidth: "250px" }}>
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>로그인</Card.Title>
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
            <>
              {loading && <CenteredSpinner />}
              {!loading && (
                <>
                  <Button
                    type="submit"
                    className="w-100 mt-3"
                    variant="primary"
                  >
                    로그인
                  </Button>
                  <GoogleButton onClick={() => dispatch(actions.tryGoogleAuth())}>
                    구글계정으로 시작하기
                  </GoogleButton>
                </>
              )}
            </>
          </Form>
        </Card.Body>
      </Card>
      <div className="text-center mt-2">
        계정이 없으신가요?
        {' '}
        <Link to="/auth/register">회원가입</Link>
      </div>
      {error && (
        <AlertSnackbar
          type="error"
          message={error}
          onClose={onCloseError}
        />
      )}
    </>
  );
}

export default React.memo(Login);
