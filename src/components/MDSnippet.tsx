import { Snippet } from "@prisma/client";
import MDEditor from "./MDEditor";

export default function MDSnippet({ snippet }: { snippet: Snippet }) {
  return (
    <>
      <input defaultValue={snippet?.title} id="snippetTitle"></input>
      <MDEditor content={snippet?.content} />
    </>
  );
}
