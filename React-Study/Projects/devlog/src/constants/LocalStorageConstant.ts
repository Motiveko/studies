import { ReadonlyDeep } from 'type-fest';

const localStorageConstant = {
  keyAuth: 'auth',
};

export const LOCAL_STORAGE_CONST: ReadonlyDeep<typeof localStorageConstant> = localStorageConstant;
