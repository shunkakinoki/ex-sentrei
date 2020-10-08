import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

import fs from "fs";
import {join} from "path";

const postsDirectory = join(process.cwd(), "../../legal");

export default async function getPostBySlug(slug: string): Promise<string> {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const {content} = matter(fileContents);
  const result = await remark().use(html).process(content);
  return result.toString();
}
