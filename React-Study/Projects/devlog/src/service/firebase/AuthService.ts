import {
  createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut,
} from "firebase/auth";
import { auth } from "../../firebase";
import { getRandomProfile } from "../../utils/random-util";
import { registerUser } from "./UserService";

type callSignUpApi = (email: string, password: string) => Promise<void>;
type callLoginApi = (email: string, password: string) => Promise<string>;
type callGoogleAuthApi = () => Promise<string>;
type callLogoutApi = () => Promise<void>;

export const callLoginApi: callLoginApi = async (email, password) => {
  const { user: { uid } } = await signInWithEmailAndPassword(auth, email, password);
  return uid;
};
export const callSignUpApi: callSignUpApi = async (email, password) => {
  const userCredentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const { uid, emailVerified } = userCredentials.user;
  let { displayName, photoURL } = userCredentials.user;

  if (!displayName) {
    displayName = email.substring(0, email.indexOf("@"));
  }
  if (!photoURL) {
    photoURL = getRandomProfile();
  }

  await registerUser({
    uid, email, emailVerified, photoURL, displayName,
  });
};

export const callLogoutApi: callLogoutApi = async () => {
  await signOut(auth);
};

export const callGoogleAuthApi: callGoogleAuthApi = async () => {
  const { user: { uid } } = await signInWithPopup(auth, provider);
  return uid;
};

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export default {};
