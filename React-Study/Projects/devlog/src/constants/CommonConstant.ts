import { ReadonlyDeep } from 'type-fest';

const commonConstant = {
  GIT_PREFIX: 'https://github.com',
  DEFAULT_THUMBNAIL: '/assets/thumbnail.png',
};

export const COMMON_CONSTANT: ReadonlyDeep<typeof commonConstant> = commonConstant;
