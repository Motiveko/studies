import { doc, DocumentData, DocumentReference, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { FIRESTORE_DOC } from '../../constants/FirebaseConstant';

// 회원정보 관련
export type User = {
  uid: string;
  email: string;
  emailVerified: boolean;
  photoURL: string | null;
  displayName: string;
  description?: string;
  gitURL?: string;
};

const db = getFirestore();

type GetUser = (uid: string) => Promise<User>;
type RegisterUser = (user: User) => Promise<void>;
type UpdateUser = (user: Partial<User> & { uid: string }) => Promise<void>;

type GetUserRef = (uid: string) => DocumentReference<DocumentData>;

/**
 * firestore에 유저 정보 등록
 * @param user User
 * @returns Promise
 */
export const registerUser: RegisterUser = user => {
  const newUserRef = getUserRef(user.uid);
  return setDoc(newUserRef, user);
};

/**
 * 유저정보 가져오기
 * @param uid user의 uid
 * @returns Promise<User>
 */
export const getUser: GetUser = async (uid: string) => {
  const doc = await getDoc<DocumentData>(getUserRef(uid));
  if (!doc.exists()) {
    throw new Error(`id: ${uid} 인 유저를 찾을 수 없습니다.`);
  }
  return { uid: doc.id, ...doc.data() } as User;
};

/**
 * 유저정보 업데이트
 * @param user {uid} & Partail<User>
 */
export const updateUser: UpdateUser = async user => {
  const userRef = getUserRef(user.uid);
  await updateDoc(userRef, user);
};

const getUserRef: GetUserRef = uid => doc(db, FIRESTORE_DOC.USER, uid);
