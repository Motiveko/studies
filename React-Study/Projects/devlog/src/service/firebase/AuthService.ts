import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";

type callSignUpApi = (email: string, password: string) => Promise<void>;
type callLoginApi = (email: string, password: string) => Promise<string>;
type callGoogleAuthApi = () => Promise<string>;
type callLogoutApi = () => Promise<void>;

export const callLoginApi: callLoginApi = async (email, password) => {
  const { user: { uid } } = await signInWithEmailAndPassword(auth, email, password);
  return uid;
};

export const callGoogleAuthApi = async () => {
  const { user: { uid } } = await signInWithPopup(auth, provider);
  return uid;
};
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export default {};
