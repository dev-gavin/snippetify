import SnippetMD from "./SnippetMD";
import { SnippetChangeHandler, Snippet } from "../../types";

// TODO: better typing
type CurrentSnippetProps = {
  snippet: Snippet;
  handleSnippetChange: SnippetChangeHandler;
};

export default function CurrentSnippet({
  snippet,
  handleSnippetChange,
}: CurrentSnippetProps) {
  const saveSnippetToDb = async () => {
    try {
      await fetch(`http://localhost:8080/snippets/${snippet?.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: snippet?.created_by,
          title: snippet?.title,
          content: snippet?.content,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <input
        className="my-4 w-full bg-red-50 py-2 text-4xl outline-red-300"
        onChange={(e) => handleSnippetChange("title", e.target.value)}
        value={snippet?.title}
        placeholder="New Snippet Title"
        id="snippetTitle"
      ></input>
      <button onClick={saveSnippetToDb} className="bg-black p-4 text-white">
        Save Snippet
      </button>
      <SnippetMD
        content={snippet?.content}
        handleSnippetChange={handleSnippetChange}
      />
    </>
  );
}
