const fs = require("fs");
const path = require("path");
const sass = require("node-sass");

const getComponents = () => {
  let allComponents = [];

  const types = ["atoms", "molecules", "organisms"];

  types.forEach((type) => {
    const allFiles = fs
      .readdirSync(`src/${type}`)
      .map((file) => ({
        input: `src/${type}/${file}`,
        output: `src/lib/${file.slice(0, -4)}css`,
      }));

    allComponents = allComponents.concat(allFiles);
  });

  return allComponents;
};

const compile = (filePath, filename) => {
  const result = sass
    .renderSync({
      data: fs
        .readFileSync(path.resolve(filePath))
        .toString(),
      outputStyle: "expanded",
      includePaths: [path.resolve("src")],
    })
    .css.toString();

  fs.writeFileSync(path.resolve(filename), result);
};

getComponents().forEach(({ input, output }) => {
  console.log(input, output);
  compile(input, output);
});

compile("src/global.scss", "src/lib/global.css");
