import React, { useContext, useEffect, useState } from "react";

type props = {
  children: React.ReactNode;
};

export type CommonContext = {
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  localLoading: boolean;
  setLocalLoading: React.Dispatch<React.SetStateAction<boolean>>;
  globalLoading: boolean;
  setGlobalLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
const CommonContext = React.createContext<CommonContext | undefined>(undefined);

export const useCommon = () => {
  const context = useContext(CommonContext);
  if (!context) {
    throw new Error("useCommon은 CommonProvider 내에서 호출되어야 합니다.");
  }

  return context;
};

export default function CommonProvider({ children }: props) {
  const [error, setError] = useState<string | null>(null);
  const [localLoading, setLocalLoading] = useState<boolean>(false); // 부분 스피너
  const [globalLoading, setGlobalLoading] = useState<boolean>(false); // 전역 스피너(작업을 막는다)

  // 에러는 3초만 보여주고 지운다.
  useEffect(() => {
    if (error != null) {
      setTimeout(() => setError(null), 5000);
    }
  }, [error]);

  return (
    <CommonContext.Provider
      value={{
        error,
        setError,
        localLoading,
        setLocalLoading,
        globalLoading,
        setGlobalLoading,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
}
