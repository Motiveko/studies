import React, { useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'


const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password); // Promise
  }

  useEffect(() => {
    const unsubscriber = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    });
    return unsubscriber // 이벤트 리스너 정리
  }, [])  // 최초 1회만 실행

  const value = {
    currentUser,
    signup
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}