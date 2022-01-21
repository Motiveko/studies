import React, { useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, updateEmail as _updateEmail , updatePassword as _updatePassword} from 'firebase/auth'
import { auth } from '../firebase'
import GoogleAuthContextProvider from "./GoogleAuth";

const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true); // 이게 필요한가?

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password); // Promise
  }
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logout = () => {
    return signOut(auth);
  }

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  }

  const updateEmail = (email) => {
    return _updateEmail(currentUser, email);
  }

  const updatePassword = (password) => {
    return _updatePassword(currentUser, password);
  }

  useEffect(() => {
    const unsubscriber = auth.onAuthStateChanged(user => {
      console.log(user);
      setCurrentUser(user); // 가입 안도 최최 null이 들어온다
      setLoading(false);
    });
    return unsubscriber // 이벤트 리스너 정리
  }, [])  // 최초 1회만 실행

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }
  return (
    <AuthContext.Provider value={value}>
      <GoogleAuthContextProvider>
        {!loading && children}
      </GoogleAuthContextProvider>
    </AuthContext.Provider>
  )
}