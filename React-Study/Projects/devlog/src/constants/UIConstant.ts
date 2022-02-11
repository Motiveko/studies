import { ReadonlyDeep } from 'type-fest';

type UI_CONST = {
  ANONYMOUSE_THUMBNAIL: string[];
  EDITOR_HEIGHT: string;
  PREVIEW_HEIGHT: string;
  EDITOR_WIDTH: string;
};

const UI_CONST: ReadonlyDeep<UI_CONST> = {
  ANONYMOUSE_THUMBNAIL: ['dog', 'frog', 'monkey', 'mouse'],
  EDITOR_HEIGHT: '76vh',
  PREVIEW_HEIGHT: 'calc(80vh + 3.5rem)',
  EDITOR_WIDTH: '48vw',
};

export default UI_CONST;
