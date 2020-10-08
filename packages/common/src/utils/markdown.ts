import remark from "remark";
import html from "remark-html";
import vfile from "vfile";

export default async function markdown(
  markdownFile: vfile.VFileCompatible,
): Promise<string> {
  const result = await remark().use(html).process(markdownFile);
  return result.toString();
}
