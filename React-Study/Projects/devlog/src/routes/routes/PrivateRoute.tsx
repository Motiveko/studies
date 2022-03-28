import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from '../../store/store';

export default function PrivateRoute() {
  const user = useSelector(({ auth: { user } }: RootState) => (user));
  const authenticated = useMemo(() => user !== null, [user]);

  return authenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" replace />
  );
  // return <Outlet />;
}
