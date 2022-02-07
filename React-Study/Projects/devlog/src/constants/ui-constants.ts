import { ReadonlyDeep } from 'type-fest';

type UI_CONST = {
  ANONYMOUSE_THUMBNAIL: string[];
  EDITOR_HEIGHT: string;
  EDITOR_WIDTH: string;
};

const UI_CONST: ReadonlyDeep<UI_CONST> = {
  ANONYMOUSE_THUMBNAIL: ['dog', 'frog', 'monkey', 'mouse'],
  EDITOR_HEIGHT: '80vh',
  EDITOR_WIDTH: '48vw',
};

export default UI_CONST;
