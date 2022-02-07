import { ReadonlyDeep } from 'type-fest';

type UI_CONST = {
  ANONYMOUSE_THUMBNAIL: string[];
};

const UI_CONST: ReadonlyDeep<UI_CONST> = {
  ANONYMOUSE_THUMBNAIL: ['dog', 'frog', 'monkey', 'mouse'],
};

export default UI_CONST;
