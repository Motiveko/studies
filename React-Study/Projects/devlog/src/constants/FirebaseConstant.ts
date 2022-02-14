import { ReadonlyDeep } from 'type-fest';

type FirebaseDoc = {
  POSTING: string;
  USER: string;
  COMMENT: string;
};
export const FIRESTORE_DOC: ReadonlyDeep<FirebaseDoc> = {
  POSTING: 'posting',
  USER: 'user',
  COMMENT: 'comment',
};
