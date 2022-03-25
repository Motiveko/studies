import { ReadonlyDeep } from 'type-fest';

type FirebaseDoc = {
  POSTING: string;
  POSTING_SIZE: number;
  USER: string;
  COMMENT: string;
};
const localStorageConstant = {
  keyAuth: 'auth',
};

type UI_CONST = {
  ANONYMOUSE_THUMBNAIL: string[];
  EDITOR_HEIGHT: string;
  PREVIEW_HEIGHT: string;
  EDITOR_WIDTH: string;
};

const commonConstant = {
  GIT_PREFIX: 'https://github.com',
  DEFAULT_THUMBNAIL: '/assets/thumbnail.png',
};
export const FIRESTORE_DOC: ReadonlyDeep<FirebaseDoc> = {
  POSTING: 'posting',
  POSTING_SIZE: 25,
  USER: 'user',
  COMMENT: 'comment',
};
export const LOCAL_STORAGE_CONST: ReadonlyDeep<typeof localStorageConstant> = localStorageConstant;
export const UI_CONST: ReadonlyDeep<UI_CONST> = {
  ANONYMOUSE_THUMBNAIL: ['dog', 'frog', 'monkey', 'mouse'],
  EDITOR_HEIGHT: '76vh',
  PREVIEW_HEIGHT: 'calc(80vh + 3.5rem)',
  EDITOR_WIDTH: '48vw',
};
export const COMMON_CONSTANT: ReadonlyDeep<typeof commonConstant> = commonConstant;
