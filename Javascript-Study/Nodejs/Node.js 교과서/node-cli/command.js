#! /usr/bin/env node
import chalk from "chalk";
import { program } from "commander";
import inquirer from "inquirer";
import makeTemplate from "./vanilla-template/template.js";

program.version("0.0.1", "-v, --version").name("cli");

program
  .command("template <type>")
  .usage("<type> --filename [filename] --directory [path]")
  .description("템플릿을 생성합니다.")
  .alias("tmpl")
  .option("-f, --filename [filename]", "파일명을 입력하세요.", "index")
  .option("-d, --directory [path]", "생성 경로를 입력하세요", ".")
  .action((type, options, ...args) => {
    console.log(args);
    const { filename, directory } = options || {};
    makeTemplate(type, filename, directory);
  });

program.command("test [a1] [a2]").action((arg1, arg2, cmd, args, ...rest) => {
  console.log(cmd);
  console.log(rest); // 무조건 빈 배열..
});

program.action((cmd, { args: [arg] }) => {
  if (arg) {
    console.log("해당 명령어를 찾을 수 없습니다.");
    program.help();
  } else {
    inquirer
      .prompt([
        {
          type: "list",
          name: "type",
          message: "템플릿 종류를 선택하세요",
          choices: ["html", "express-router"],
        },
        {
          type: "input",
          name: "name",
          message: "파일의 이름을 입력하세요",
          default: "index",
        },
        {
          type: "input",
          name: "directory",
          message: "파일이 위치할 폴더의 경로를 입력하세요",
          default: ".",
        },
        {
          type: "confirm",
          name: "confirm",
          message: "생성하시겠습니까?",
        },
      ])
      .then(async (answer) => {
        console.log(answer);
        const { type, name, directory, confirm } = answer;
        if (confirm) {
          await makeTemplate(type, name, directory);
          console.log(chalk.bold.bgBlueBright("====== 터미널 종료 ======"));
        }
      });
  }
});

program.parse(process.argv);
