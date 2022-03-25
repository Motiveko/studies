import { UI_CONST } from "../constants";

type GetRandomNumber = (max: number, min?: number) => number;
type getRandomProfile = () => string;
export const getRandomNumber: GetRandomNumber = (max, min) => {
  if (min != null) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  return Math.floor(Math.random() * max);
};

export const getRandomProfile: getRandomProfile = () => `/assets/animals/${
  UI_CONST.ANONYMOUSE_THUMBNAIL[
    getRandomNumber(UI_CONST.ANONYMOUSE_THUMBNAIL.length)
  ]
}.png`;
