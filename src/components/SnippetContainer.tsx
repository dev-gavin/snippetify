import { Snippet } from "@prisma/client";
import SnippetMD from "./SnippetMD";

export default function MDSnippetContainer({ snippet }: { snippet: Snippet }) {
  return (
    <>
      <input defaultValue={snippet?.title || ""} placeholder="New Snippet Title" id="snippetTitle"></input>
      <SnippetMD content={snippet?.content || ""} />
    </>
  );
}
