import React from "react";
import { Outlet } from "react-router-dom";
import AuthLayout from "../../layout/AuthLayout";

export default function Auth() {
  // TODO : login/logout에서 useNavigate나 useCommon부분이 중복되는 부분이 많다. 비즈니스 로직을 Auth 컴포넌트로 합칠 수 있는지 생각해보자(outletContext 사용)
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
