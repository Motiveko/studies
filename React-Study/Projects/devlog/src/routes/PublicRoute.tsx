import { Navigate, Outlet } from 'react-router-dom';

export default function PublicRoute() {
  const authenticated = false;
  return authenticated ? <Navigate to="/" replace={true} /> : <Outlet />;
}
