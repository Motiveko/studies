import chalk from "chalk";
import * as path from "node:path";
import { ask, close, readlineInstance } from "./ask.js";
import { createFile, fsExists, mkdir } from "./files.js";
import { typeTemplateMap } from "./model.js";

const getTemplate = async (rl) => {
  let template;

  while (!typeTemplateMap[template]) {
    template = await ask(rl, "템플릿 종류를 선택하세요. ");
  }
  return template;
};

const getFileName = async (rl) => {
  let fileName;
  while (!fileName) {
    fileName = await ask(rl, "파일의 이름을 입력하세요.");
  }
  return fileName;
};

const getDirectory = async (rl) => {
  let directory;
  while (!directory) {
    directory = await ask(rl, "파일이 위치할 폴더의 경로를 입력하세요");
  }
  return directory;
};

const isValidTemplate = (type) => !typeTemplateMap[type];
const getCorrectInput = async (type, name, dir, rl) => {
  let template = type;
  let fileName = name;
  let directory = dir;
  if (isValidTemplate(type)) {
    template = await getTemplate(rl);
  }
  if (!fileName) {
    fileName = await getFileName(rl);
  }
  if (!directory) {
    directory = await getDirectory(rl);
  }
  return { template, fileName, directory, rl };
};

const makeTemplate = async (type, name, dir) => {
  const rl = readlineInstance();

  const { template, fileName, directory } = await getCorrectInput(
    type,
    name,
    dir,
    rl
  );

  const { content, ext } = typeTemplateMap[template];
  const fileNameWithExt = `${fileName}.${ext}`;

  const dirPath = path.resolve(directory);
  const fullPath = path.resolve(directory, fileNameWithExt);

  const fileExists = await fsExists(fullPath);

  if (fileExists) {
    console.log(chalk.bold.red("이미 파일이 존재합니다."));
    return close(rl);
  }

  try {
    const dirExists = await fsExists(dirPath);

    if (!dirExists) {
      await mkdir(dirPath);
    }

    await createFile(fullPath, content);
    console.log(` =====> ${fullPath} =====> \n 템플릿 생성 환료`);
  } catch (error) {
    console.error("파일 생성중 문제가 생겼습니다. \n", error);
    return close(rl);
  }

  close(rl);
};

export default makeTemplate;
