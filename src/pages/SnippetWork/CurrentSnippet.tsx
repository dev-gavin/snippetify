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
      <div className="my-4 flex h-min justify-between gap-4">
        <input
          className="w-[100%] rounded bg-midnight-600 p-4 text-4xl text-sun outline-none"
          onChange={(e) => handleSnippetChange("title", e.target.value)}
          value={snippet?.title}
          placeholder="New Snippet Title"
          id="snippetTitle"
        ></input>
        <button
          onClick={saveSnippetToDb}
          // TODO: need to add conditional logic to change button color if snippet needs to be saved
          className="self-center text-nowrap rounded bg-sun-500 p-5 text-xl font-bold text-midnight-700"
        >
          Save Snippet
        </button>
      </div>
      <SnippetMD
        content={snippet?.content}
        handleSnippetChange={handleSnippetChange}
      />
    </>
  );
}
