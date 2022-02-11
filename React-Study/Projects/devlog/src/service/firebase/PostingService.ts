import { addDoc, collection, doc, DocumentData, DocumentSnapshot, FieldValue, getDoc, getDocs, getFirestore, limit, orderBy, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { FIRESTORE_DOC } from '../../constants/FirebaseConstant';
import { getUser, User } from './UserService';

export type Posting = {
  uid: string;
  userId: string;
  title: string;
  content: string;
  thumbnail: string;
  description: string;
  tags: string[];
  createdAt: FieldValue | FirebaseTime;
  updatedAt: FieldValue | FirebaseTime;
};
export type FirebaseTime = { seconds: number; nanoseconds: number };

type UploadPost = ({ uid, userId, title, description, thumbnail, tags, content }: Omit<Posting, 'uid' | 'createdAt' | 'updatedAt'> & { uid?: string | null }) => Promise<DocumentData> | Promise<void>;
type InsertPosting = (posting: Omit<Posting, 'uid'>) => Promise<DocumentData>;

type GetPosting = (id: string) => Promise<DocumentSnapshot<DocumentData>>;
type GetPostings = () => Promise<(Posting & { user: User })[]>;
const db = getFirestore();

export const uploadPosting: UploadPost = ({ uid, userId, description, thumbnail, tags, title, content }) => {
  console.log('uid', uid);
  if (!uid) {
    // 새로운 게시글 등록
    return insertPosting({
      userId,
      title,
      content,
      description,
      thumbnail,
      tags,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } else {
    // 게시글 업데이트
    return updatePosting({ uid, title, content, description, thumbnail, tags, updatedAt: serverTimestamp() });
  }
};

const insertPosting: InsertPosting = posting => {
  const newPostingRef = collection(db, FIRESTORE_DOC.POSTING);
  return addDoc(newPostingRef, posting);
};

const updatePosting = (posting: Omit<Posting, 'userId' | 'createdAt'>) => {
  const prevPostRef = doc(db, FIRESTORE_DOC.POSTING, posting.uid);
  return updateDoc(prevPostRef, { ...posting });
};

export const getPosting: GetPosting = id => {
  return getDoc(doc(db, FIRESTORE_DOC.POSTING, id));
};

/**
 * 포스팅 가져오기(페이징)
 * @returns Promise<(Posting & { user: User })[]>
 */
export const getPostings: GetPostings = async () => {
  const querySnapshot = await getDocs(query(collection(db, FIRESTORE_DOC.POSTING), orderBy('createdAt', 'desc'), limit(25)));

  const postings = querySnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as Posting));
  const users = await Promise.all(postings.map(posting => getUser(posting.userId)));

  return postings.map((posting, i) => ({ ...posting, user: users[i] }));
};
