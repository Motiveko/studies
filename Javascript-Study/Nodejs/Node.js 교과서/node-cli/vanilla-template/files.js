import * as fs from "node:fs/promises";
import * as path from "node:path";

export const fsExists = async (directory) => {
  try {
    await fs.stat(directory);
    return true;
  } catch (error) {
    return false;
  }
};

export const mkdir = async (dir) => {
  await dir.split(path.sep).reduce(async (accPath, cur) => {
    const acc = await accPath;
    accPath = path.join(acc, cur);

    const exists = await fsExists(accPath);
    if (!exists) {
      await fs.mkdir(accPath);
    }
    return Promise.resolve(accPath);
  }, Promise.resolve("/"));
};

export const readFile = async (path) =>
  await (await fs.readFile(path)).toString();

export const createFile = async (path, data) => await fs.appendFile(path, data);
