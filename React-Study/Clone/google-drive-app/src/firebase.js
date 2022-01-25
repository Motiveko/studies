import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { collection, getFirestore, addDoc, serverTimestamp, doc, getDoc, query, where, orderBy, getDocs, setDoc} from 'firebase/firestore'

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
const foldersRef = collection(firestore, 'folders');
const filesRef = collection(firestore, 'files');

export const addFolder = (folder) => addDoc(
  foldersRef, 
  {
    ...folder,
    createdAt: serverTimestamp()
  });
export const addFile = (file) => addDoc(filesRef, file);

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

export default app;

// (async () => {
//   const citiesRef = collection(firestore, "cities");
//   await setDoc(doc(citiesRef, "SF"), {
//       name: "San Francisco", state: "CA", country: "USA",
//       capital: false, population: 860000,
//       regions: ["west_coast", "norcal"] });
//   await setDoc(doc(citiesRef, "LA"), {
//       name: "Los Angeles", state: "CA", country: "USA",
//       capital: false, population: 3900000,
//       regions: ["west_coast", "socal"] });
//   await setDoc(doc(citiesRef, "DC"), {
//       name: "Washington, D.C.", state: null, country: "USA",
//       capital: true, population: 680000,
//       regions: ["east_coast"] });
//   await setDoc(doc(citiesRef, "TOK"), {
//       name: "Tokyo", state: null, country: "Japan",
//       capital: true, population: 9000000,
//       regions: ["kanto", "honshu"] });
//   await setDoc(doc(citiesRef, "BJ"), {
//       name: "Beijing", state: null, country: "China",
//       capital: true, population: 21500000,
//       regions: ["jingjinji", "hebei"] });
// })()