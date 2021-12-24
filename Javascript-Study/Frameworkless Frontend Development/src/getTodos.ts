/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
declare const faker: any;

export interface Todo {
  text: string;
  completed: boolean;
}
type ElementFactory = () => Todo;
const createElement: ElementFactory = () => ({
  text: faker.random.words(2) as string,
  completed: faker.random.boolean() as boolean
});

const repeat: (ef: ElementFactory, num: number) => Todo[] = (ef, num) => {
  const array = [];
  for (let index = 0; index < num; index++) {
    array.push(createElement());
  }
  return array;
};

export const getTodos = () => {
  const howMany = faker.random.number(10) as number;
  return repeat(createElement, howMany);
};
