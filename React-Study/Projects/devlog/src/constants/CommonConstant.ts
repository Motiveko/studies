import { ReadonlyDeep } from 'type-fest';

const commonConstant = {
  GIT_PREFIX: 'https://github.com',
};

export const COMMON_CONSTANT: ReadonlyDeep<typeof commonConstant> = commonConstant;
