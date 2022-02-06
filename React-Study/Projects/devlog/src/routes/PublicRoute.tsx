import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PublicRoute() {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/" replace={true} /> : <Outlet />;
}
