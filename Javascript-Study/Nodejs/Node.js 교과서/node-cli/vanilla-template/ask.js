import * as readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";

export const readlineInstance = () =>
  readline.createInterface({
    input,
    output,
  });

export const ask = (rl, question) =>
  new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });

export const close = (rl) => rl.close();
