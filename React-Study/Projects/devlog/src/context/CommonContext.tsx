import React, { useContext, useEffect, useState } from 'react';

type Prop = {
  children: JSX.Element | JSX.Element[];
};

export type CommonContext = {
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
const CommonContext = React.createContext<CommonContext | undefined>(undefined);

export const useCommon = () => {
  const context = useContext(CommonContext);
  if (!context) {
    throw new Error('useCommon은 CommonProvider 내에서 호출되어야 합니다.');
  }

  return context;
};

export function CommonProvider({ children }: Prop) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 에러는 3초만 보여주고 지운다.
  useEffect(() => {
    if (error != null) {
      setTimeout(() => setError(null), 3000);
    }
  }, [error]);

  return <CommonContext.Provider value={{ error, setError, isLoading, setIsLoading }}>{children}</CommonContext.Provider>;
}
