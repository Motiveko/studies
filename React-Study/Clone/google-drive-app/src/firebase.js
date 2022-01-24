import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { collection, getFirestore, addDoc, serverTimestamp} from 'firebase/firestore'

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

// export const database = {
//   folders: collection(firestore, 'folders'),
//   files: collection(firestore, 'files')
// }
// database.add('')

// v9 기준 문법
const firestore = getFirestore();
export const addFolder = (folder) => addDoc(
  collection(firestore, 'folders'), 
  {
    ...folder,
    createdAt: serverTimestamp()
  });
export const addFile = (file) => addDoc(collection(firestore, 'files'), file);


export const auth = getAuth();

export default app;
