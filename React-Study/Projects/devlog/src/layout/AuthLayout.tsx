import React from 'react';
import { Container } from 'react-bootstrap';

type props = {
  children: React.ReactNode;
};
export default function AuthLayout({ children }: props) {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
      <div>{children}</div>
    </Container>
  );
}
