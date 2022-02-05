import { Outlet } from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout';

export default function () {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
