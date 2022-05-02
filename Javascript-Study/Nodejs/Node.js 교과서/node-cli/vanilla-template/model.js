import { readFile } from "./files.js";
import * as path from "node:path";
import { URL } from "url";

const __dirname = decodeURI(new URL(".", import.meta.url).pathname);

const htmlContent = await readFile(
  path.resolve(__dirname, "../template/htmlTemplate.html")
);
const routerContent = await readFile(
  path.resolve(__dirname, "../template/routerTemplate.js")
);
export const typeTemplateMap = {
  html: {
    content: htmlContent,
    ext: "html",
  },
  "express-router": {
    content: routerContent,
    ext: "js",
  },
};
