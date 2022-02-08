import { addDoc, collection, doc, DocumentData, DocumentSnapshot, FieldValue, getDoc, getFirestore, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { ReadonlyDeep } from 'type-fest';

export type Posting = {
  uid: string;
  userId: string;
  title: string;
  content: string;
  thumbnail: string;
  description: string;
  tags: string[];
  createdAt: FieldValue;
  updatedAt: FieldValue;
};

type UploadPost = ({ uid, userId, title, description, thumbnail, tags, content }: Omit<Posting, 'uid' | 'createdAt' | 'updatedAt'> & { uid?: string | null }) => Promise<DocumentData> | Promise<void>;
type InsertPosting = (posting: Omit<Posting, 'uid'>) => Promise<DocumentData>;

type GetPosting = (id: string) => Promise<DocumentSnapshot<DocumentData>>;
type POSTING_CONSTANT = {
  DOC_POSTING: string;
};

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
  const newPostingRef = collection(db, POSTING_CONSTANT.DOC_POSTING);
  return addDoc(newPostingRef, posting);
};

const updatePosting = (posting: Omit<Posting, 'userId' | 'createdAt'>) => {
  const prevPostRef = doc(db, POSTING_CONSTANT.DOC_POSTING, posting.uid);
  return updateDoc(prevPostRef, { ...posting });
};

export const getPosting: GetPosting = id => {
  return getDoc(doc(db, POSTING_CONSTANT.DOC_POSTING, id));
};

export const POSTING_CONSTANT: ReadonlyDeep<POSTING_CONSTANT> = {
  DOC_POSTING: 'posting',
};
