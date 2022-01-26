import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { collection, getFirestore, addDoc, serverTimestamp, doc, getDoc, query, where, orderBy, getDocs, setDoc} from 'firebase/firestore'

import { getStorage, ref, uploadBytes } from 'firebase/storage'

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
// === firestore ===
const firestore = getFirestore();
const foldersRef = collection(firestore, 'folders');
const filesRef = collection(firestore, 'files');

export const addFolder = (folder) => addDoc(
  foldersRef, 
  {
    ...folder,
    createdAt: serverTimestamp()
  });
  
export const formatDoc = (doc) => ({ id: doc.id, ...doc.data() });

export const getFolder = (id) => getDoc(doc(firestore, 'folders', id));

export const getChildFolder = (parentId, currentUser) => {
  return getDocs(
    query(
      foldersRef, 
      where('parentId', "==", parentId), 
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
      )
      );
    }
export const auth = getAuth();
      
// === storage ===
export const addFile = (file) => addDoc(filesRef, file);

const storage = getStorage();
const getFileRef = (userId, filePath) => ref(storage, `/files/${userId}/${filePath}`);

export const uploadFile = (userId, filePath, file) => uploadBytes(getFileRef(userId, filePath), file);

export default app;
