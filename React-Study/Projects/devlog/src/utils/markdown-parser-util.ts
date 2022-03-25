import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify/lib";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse/lib";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export const parseText = (text: string) =>
  unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(remarkGfm)
    .use(rehypeStringify)
    .use(rehypeHighlight, { ignoreMissing: true })
    .processSync(text)
    .toString();
