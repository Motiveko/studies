import { addDoc, collection, deleteDoc, doc, FieldValue, getDocs, getFirestore, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { FIRESTORE_DOC } from '../../constants/FirebaseConstant';
import { FirebaseTime } from './PostingService';
import { getUser, User } from './UserService';

export type Comment = {
  uid: string;
  userId: string;
  postId: string;
  comment: string;
  createdAt: FieldValue | FirebaseTime;
  updatedAt: FieldValue | FirebaseTime;
};
type AddComment = (comment: Pick<Comment, 'userId' | 'postId' | 'comment'>) => Promise<string>;
type UpdateComment = (comment: Pick<Comment, 'uid' | 'postId' | 'comment'>) => Promise<void>;
type GetComments = (postId: string) => Promise<(Comment & { user: User })[]>;
type DeleteComment = (uid: string) => Promise<void>;
type GetCommentsCount = (postId: string) => Promise<number>;

const db = getFirestore();

/**
 * 코멘트 등록
 * @param comment Pick<Comment, 'userId' | 'postId'>
 * @returns Promise<string>;
 */
export const addComment: AddComment = async comment => {
  const newCommentRef = collection(db, FIRESTORE_DOC.COMMENT);
  const result = await addDoc(newCommentRef, { ...comment, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  return result.id;
};

/**
 * 코멘트 업데이트
 * @param comment Pick<Comment, 'uid' | 'userId' | 'postId'>
 */
export const updateComment: UpdateComment = async comment => {
  const prevCommentRef = doc(db, FIRESTORE_DOC.COMMENT, comment.uid);
  await updateDoc(prevCommentRef, { ...comment, updatedAt: serverTimestamp() });
};

/**
 * 포스팅의 댓글 모두 가져오기
 * @param postId
 * @returns Promise<Comment & {user: User}>
 */
export const getComments: GetComments = async postId => {
  const querySnapshot = await getDocs(query(collection(db, FIRESTORE_DOC.COMMENT), where('postId', '==', postId), orderBy('createdAt', 'desc')));

  const comments = querySnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as Comment));

  const users = await Promise.all(comments.map(comment => getUser(comment.userId)));
  return comments.map((comment, i) => ({ ...comment, user: users[i] }));
};

/**
 * 코멘트 갯수 가져오기
 * @param postId
 * @returns Promise<number>
 */
export const getCommentsCount: GetCommentsCount = async postId => {
  return (await getComments(postId)).length;
};

/**
 * 댓글 삭제
 * @param uid 댓글 uid
 */
export const deleteComment: DeleteComment = async uid => {
  await deleteDoc(doc(db, FIRESTORE_DOC.COMMENT, uid));
};
