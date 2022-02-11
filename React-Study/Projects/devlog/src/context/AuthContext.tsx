import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { app } from '../firebase';
import { useContext } from 'react';
import { getItem, removeItem, setItem } from '../service/LocalStorageService';
import { getUser, User } from '../service/firebase/UserService';
import { LOCAL_STORAGE_CONST } from '../constants/LocalStorageConstant';

type Prop = {
  children: JSX.Element | JSX.Element[];
};

type SignUp = (email: string, password: string) => Promise<UserCredential>;
type Login = (email: string, password: string) => Promise<UserCredential>;
type Logout = () => Promise<void>;
type IsAuthenticated = () => boolean;
type AuthContext = {
  currentUser: User | null;
  signUp: SignUp;
  login: Login;
  logout: Logout;
  isAuthenticated: IsAuthenticated;
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

export default function AuthProvider({ children }: Prop) {
  const [currentUser, setCurrentUser] = useState<User | null>(getItem(LOCAL_STORAGE_CONST.keyAuth));

  const login: Login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signUp: SignUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout: Logout = () => {
    return signOut(auth);
  };

  const isAuthenticated: IsAuthenticated = () => currentUser !== null;

  useEffect(() => {
    return auth.onAuthStateChanged(async fireUser => {
      if (!fireUser) {
        removeItem(LOCAL_STORAGE_CONST.keyAuth);
        setCurrentUser(null);
        return;
      }

      const user = await getUser(fireUser.uid);
      setItem(LOCAL_STORAGE_CONST.keyAuth, user);
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        signUp,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
