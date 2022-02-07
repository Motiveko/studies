type GetRandomNumber = (max: number, min?: number) => number;
export const getRandomNumber: GetRandomNumber = (max, min) => {
  if (min != null) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  return Math.floor(Math.random() * max);
};
