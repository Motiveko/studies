import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { collection, getFirestore, addDoc, serverTimestamp, doc, getDoc, query, where, orderBy, getDocs, setDoc} from 'firebase/firestore'

import { getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'

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
  
/**
 * DocumentSnapshot을 포맷팅한다.
 * @param {*} doc DocumentSnapshot<DocumentData>
 * @returns {id: string } && DocumentData
 */
export const formatDoc = (doc) => ({ id: doc.id, ...doc.data() });

/**
 * 현재 폴더 가져오기
 * @param {*} id 
 * @returns Promise<DocumentSnapshot<DocumentData>>
 */
export const getFolder = (id) => getDoc(doc(firestore, 'folders', id));

/**
 * 현재 폴더의 자식폴더 가져오기
 * @param {*} parentId 
 * @param {*} currentUser 
 * @returns Promise<QuerySnapshot<DocumentData>>
 */
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

/**
 * 현재 폴더에 저장된 파일 가져오기
 * @param {*} folderId 
 * @param {*} currentUser 
 * @returns Promise<QuerySnapshot<DocumentData>>
 */
export const getFiles = (folderId, currentUser) => {
  // console.log(`folderId: ${folderId}, userId: ${currentUser.uid}`)
  return getDocs(
    query(
      filesRef,
      where('folder', '==', folderId),
      where('userId', '==', currentUser.uid),
      // orderBy('createAt', 'desc')
    )
  )
}
    
// === auth ===
export const auth = getAuth();
      
// === storage ===
export const addFile = (file) => addDoc(filesRef, { ...file, createdAt: serverTimestamp() });

const storage = getStorage();
const getFileRef = (userId, filePath) => ref(storage, `/files/${userId}/${filePath}`);

/**
 * 파일 업로드
 * @param {*} userId 
 * @param {*} filePath 
 * @param {*} file 
 * @returns UploadTask
 */
export const uploadFile = (userId, filePath, file) => uploadBytesResumable(getFileRef(userId, filePath), file);

/**
 * 파일 업로드
 * @param {*} userId 
 * @param {*} filePath 
 * @param {*} file 
 * @returns Promise<UploadResult>
 */
export const uploadFileBytes = (userId, filePath, file) => uploadBytes(getFileRef(userId, filePath), file);



export default app;
