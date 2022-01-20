import React, { useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../firebase'

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
    logout
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}