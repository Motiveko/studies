import { ReadonlyDeep } from 'type-fest';

type FirebaseDoc = {
  POSTING: string;
  USER: string;
};
export const FIRESTORE_DOC: ReadonlyDeep<FirebaseDoc> = {
  POSTING: 'posting',
  USER: 'user',
};
