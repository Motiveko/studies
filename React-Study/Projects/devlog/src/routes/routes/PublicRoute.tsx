import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../store/store";

export default function PublicRoute() {
  const user = useSelector(({ auth: { user } }: RootState) => (user));
  const authenticated = useMemo(() => user !== null, [user]);
  return authenticated ? <Navigate to="/" replace /> : <Outlet />;
}
