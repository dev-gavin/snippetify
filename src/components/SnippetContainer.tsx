import { Snippet } from "@prisma/client";
import SnippetMD from "./SnippetMD";

// TODO: better typing
export default function MDSnippetContainer({
  snippet,
  handleSnippetTitleChange,
  handleSnippetContentChange,
}: {
  snippet: Snippet;
  handleSnippetTitleChange: Function;
  handleSnippetContentChange: Function;
}) {
  return (
    <>
      <input
        onChange={handleSnippetTitleChange}
        defaultValue={snippet?.title || ""}
        placeholder="New Snippet Title"
        id="snippetTitle"
      ></input>
      <SnippetMD content={snippet?.content || ""} handleSnippetContentChange={handleSnippetContentChange} />
    </>
  );
}
