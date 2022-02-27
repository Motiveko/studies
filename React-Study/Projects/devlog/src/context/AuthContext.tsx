import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, UserCredential } from 'firebase/auth';
import { app } from '../firebase';
import { useContext } from 'react';
import { getItem, removeItem, setItem } from '../service/LocalStorageService';
import { getUser, registerUser, User } from '../service/firebase/UserService';
import { LOCAL_STORAGE_CONST } from '../constants/LocalStorageConstant';
import { MyError } from '../core/MyError';
import { getRandomProfile } from '../utils/random-util';

type props = {
  children: React.ReactNode;
};

type SignUp = (email: string, password: string) => void;
type Login = (email: string, password: string) => void;
type Logout = () => void;
type IsAuthenticated = () => boolean;
type _SetUser = (uid: string) => Promise<void>;
type RefreshUser = () => Promise<void>;
type AuthContext = {
  currentUser: User | null;
  signUp: SignUp;
  login: Login;
  logout: Logout;
  refreshUser: RefreshUser;
  isAuthenticated: IsAuthenticated;
  authWithGoogle: () => Promise<void>;
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

export default function AuthProvider({ children }: props) {
  const [currentUser, setCurrentUser] = useState<User | null>(getItem(LOCAL_STORAGE_CONST.keyAuth));

  const login: Login = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      await _setUser(user.uid);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const message = e.message as string;
      if (!!message && (message.includes('wrong-password') || message.includes('user-not-found'))) {
        throw new MyError('이메일/비밀번호가 일치하지 않습니다.');
      }
      throw new MyError('로그인 중 문제가 발생하였습니다.');
    }
  };

  const signUp: SignUp = async (email, password) => {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    const { uid, emailVerified } = userCredentials.user;
    let { displayName, photoURL } = userCredentials.user;

    if (!displayName) {
      displayName = email.substring(0, email.indexOf('@'));
    }
    if (!photoURL) {
      photoURL = getRandomProfile();
    }

    await registerUser({ uid, email, emailVerified, photoURL, displayName });
  };

  const logout: Logout = async () => {
    await signOut(auth);
  };

  const isAuthenticated: IsAuthenticated = () => currentUser !== null;

  useEffect(() => {
    return auth.onAuthStateChanged(async fireUser => {
      if (!fireUser) {
        removeItem(LOCAL_STORAGE_CONST.keyAuth);
        setCurrentUser(null);
        return;
      }
      if (!getItem(LOCAL_STORAGE_CONST.keyAuth)) {
        _setUser(fireUser.uid);
      }
    });
  }, []);

  const _setUser: _SetUser = async uid => {
    const user = await getUser(uid);
    setItem(LOCAL_STORAGE_CONST.keyAuth, user);
    setCurrentUser(user);
  };

  const refreshUser = async () => {
    if (!currentUser) return;
    await _setUser(currentUser.uid);
  };

  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  const authWithGoogle = async () => {
    const { user } = await signInWithPopup(auth, provider);

    const existingUser = await getUser(user.uid);

    // 기존 유저가 있으면 db에 다시 저장하지 않는다
    if (existingUser) return;

    const { uid, emailVerified } = user;
    let { photoURL } = user;
    const email = user.email as string;
    let { displayName } = user;

    if (!displayName) {
      displayName = email?.substring(0, email?.indexOf('@'));
    }
    if (!photoURL) {
      photoURL = getRandomProfile();
    }

    await registerUser({ uid, email, emailVerified, photoURL, displayName });
  };
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        signUp,
        logout,
        refreshUser,
        isAuthenticated,
        authWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
