import { addDoc, collection, deleteDoc, doc, FieldValue, getDoc, getDocs, getFirestore, limit, orderBy, query, serverTimestamp, startAfter, updateDoc, where } from 'firebase/firestore';
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
type GetPostings = (posting: Posting | null, size?: number) => Promise<(Posting & { user: User })[]>;
type DeletePosting = (uid: string) => Promise<void>;
type GetUserPostings = (userId: string, tag?: string, prevPosting?: Posting, size?: number) => Promise<Posting[]>;
type GetTags = (userId: string) => Promise<{ name: string; count: number }[]>;

export type PartialPosting = Omit<Posting, 'createdAt' | 'updatedAt'>;

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
export const getPostings: GetPostings = async (postingAfter, size = FIRESTORE_DOC.POSTING_SIZE) => {
  const querySnapshot = !!postingAfter
    ? await getDocs(query(collection(db, FIRESTORE_DOC.POSTING), orderBy('createdAt', 'desc'), startAfter(postingAfter.createdAt), limit(size)))
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

/**
 * 유저의 포스팅 목록 가져오기
 * @param userId 유저id
 * @param postingAfter optional: 마지막 조회 포스팅
 * @param size 페이지 사이즈
 * @returns Promise<Posting[]>
 */
export const getUserPostings: GetUserPostings = async (userId: string, tag?: string, postingAfter?: Posting, size = FIRESTORE_DOC.POSTING_SIZE) => {
  const queries = [
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    ...(tag ? [where('tags', 'array-contains', tag)] : []),
    ...(!!postingAfter ? [startAfter(postingAfter.createdAt)] : []),
    limit(size),
  ];
  const querySnapshot = await getDocs(query(collection(db, FIRESTORE_DOC.POSTING), ...queries));
  return querySnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as Posting));
};

/**
 * 유저 개시글의 전체 태그 조회 API
 * 따로 이부분만 쿼리할 수 있는 방법이 없어 포스팅 통째로 조회한 후 가져온다.
 * @param userId 유저아이디
 * @returns {name: string, count: number}[]
 */
export const getTags: GetTags = async userId => {
  const userPostings = await getUserPostings(userId, undefined, undefined, 2000);
  const tagCountMap = userPostings
    .flatMap(posting => posting.tags)
    .reduce((acc: { [key: string]: number }, tag) => {
      acc[tag] = acc[tag] ? acc[tag] + 1 : 1;
      return acc;
    }, {}); // { 태그명: count }
  return Object.keys(tagCountMap).map(tag => ({ name: tag, count: tagCountMap[tag] })); // [{name: 태그명, count: 숫자}]
};
