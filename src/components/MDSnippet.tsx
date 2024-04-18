import { Snippet } from "@prisma/client";
import MDEditor from "./MDEditor";

// TODO: have better typing of handler
export default function MDSnippet({
  snippet,
  handleSnippetChange,
}: {
  snippet: Snippet;
  handleSnippetChange: Function;
}) {
  return (
    <>
      <input
        id="snippetTitle"
        defaultValue={snippet?.title || ""}
        placeholder="Snippet Title"
        onChange={handleSnippetChange}
      ></input>
      <MDEditor content={snippet?.content || ""} />
    </>
  );
}
