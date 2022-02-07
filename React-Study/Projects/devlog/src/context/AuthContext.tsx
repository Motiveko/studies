import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, User, UserCredential } from 'firebase/auth';
import { app } from '../firebase';
import { useContext } from 'react';

type Prop = {
  children: JSX.Element | JSX.Element[];
};

type SignUp = (email: string, password: string) => Promise<UserCredential>;
type Login = (email: string, password: string) => Promise<UserCredential>;
type Logout = () => Promise<void>;
type AuthContext = {
  currentUser: User | null;
  signUp: SignUp;
  login: Login;
  logout: Logout;
};

// createContext 타입 및 초기값 설정 - https://stackoverflow.com/questions/61333188/react-typescript-avoid-context-default-value
const AuthContext = React.createContext<AuthContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 내에서 호출되어야 합니다.');
  }
  return context;
};

const auth = getAuth(app);

export function AuthProvider({ children }: Prop) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login: Login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signUp: SignUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout: Logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      // TODO : isLoading??
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        signUp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}