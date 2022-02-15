import { addDoc, collection, deleteDoc, doc, FieldValue, getDoc, getDocs, getFirestore, limit, orderBy, query, serverTimestamp, startAfter, updateDoc } from 'firebase/firestore';
import { FIRESTORE_DOC } from '../../constants/FirebaseConstant';
import { getUser, User } from './UserService';

export type Posting = {
  uid: string;
  userId: string;
  title: string;
  content: string;
  thumbnail: string | null;
  description: string;
  tags: string[];
  createdAt: FieldValue | FirebaseTime;
  updatedAt: FieldValue | FirebaseTime;
};
export type FirebaseTime = { seconds: number; nanoseconds: number };

type UploadPost = ({ uid, userId, title, description, thumbnail, tags, content }: Omit<Posting, 'uid' | 'createdAt' | 'updatedAt'> & { uid?: string | null }) => ReturnType<InsertPosting>;
type InsertPosting = (posting: Omit<Posting, 'uid'>) => Promise<Pick<Posting, 'uid'>>;

type GetPosting = (id: string) => Promise<Posting & { user: User }>;
type GetPostings = (posting: Posting | null) => Promise<(Posting & { user: User })[]>;
type DeletePosting = (uid: string) => Promise<void>;

const db = getFirestore();

export const uploadPosting: UploadPost = async ({ uid, userId, description, thumbnail, tags, title, content }) => {
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
    await updatePosting({ uid, title, content, description, thumbnail, tags, updatedAt: serverTimestamp() });
    return { uid };
  }
};

const insertPosting: InsertPosting = async posting => {
  const newPostingRef = collection(db, FIRESTORE_DOC.POSTING);
  const data = await addDoc(newPostingRef, posting);
  return { uid: data.id };
};

const updatePosting = async (posting: Omit<Posting, 'userId' | 'createdAt'>) => {
  const prevPostRef = doc(db, FIRESTORE_DOC.POSTING, posting.uid);
  await updateDoc(prevPostRef, { ...posting });
};

/**
 * 포스팅 가져오기
 * @param id
 * @returns Promise<(Posting & { user: User })[]>
 */
export const getPosting: GetPosting = async id => {
  const docSnap = await getDoc(doc(db, FIRESTORE_DOC.POSTING, id));
  const posting = { uid: docSnap.id, ...docSnap.data() } as Posting;
  const user = await getUser(posting.userId);
  return { ...posting, user };
};

/**
 * 포스팅 25개씩 가져오기(페이징)
 * @returns Promise<(Posting & { user: User })[]>
 */
export const getPostings: GetPostings = async postingAfter => {
  const querySnapshot = !!postingAfter
    ? await getDocs(query(collection(db, FIRESTORE_DOC.POSTING), orderBy('createdAt', 'desc'), startAfter(postingAfter.createdAt), limit(FIRESTORE_DOC.POSTING_SIZE)))
    : await getDocs(query(collection(db, FIRESTORE_DOC.POSTING), orderBy('createdAt', 'desc'), limit(FIRESTORE_DOC.POSTING_SIZE)));
  const postings = querySnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as Posting));
  const users = await Promise.all(postings.map(posting => getUser(posting.userId)));

  return postings.map((posting, i) => ({ ...posting, user: users[i] }));
};

/**
 * 포스팅 제거
 * @param uid 포스팅 id
 */
export const deletePosting: DeletePosting = async uid => {
  await deleteDoc(doc(db, FIRESTORE_DOC.POSTING, uid));
};
