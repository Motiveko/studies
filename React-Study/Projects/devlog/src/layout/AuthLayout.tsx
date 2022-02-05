import { Container } from 'react-bootstrap';

type Props = {
  children: JSX.Element | JSX.Element[];
};
export default function AuthLayout({ children }: Props) {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
      <div>{children}</div>
    </Container>
  );
}
