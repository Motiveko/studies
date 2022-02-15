import { ReadonlyDeep } from 'type-fest';

type FirebaseDoc = {
  POSTING: string;
  POSTING_SIZE: number;
  USER: string;
  COMMENT: string;
};
export const FIRESTORE_DOC: ReadonlyDeep<FirebaseDoc> = {
  POSTING: 'posting',
  POSTING_SIZE: 25,
  USER: 'user',
  COMMENT: 'comment',
};
