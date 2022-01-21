import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from '../firebase'
const GoogleAuthContext = React.createContext();
export const useGoogle = () => useContext(GoogleAuthContext);

export default function GoogleAuthContextProvider({ children }) {
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  const login = () => {
    return signInWithPopup(auth, provider);
  }

  const value = {
    login,
  }
  
  return (
    <GoogleAuthContext.Provider value={value}>
      {children}
    </GoogleAuthContext.Provider>
  )
}