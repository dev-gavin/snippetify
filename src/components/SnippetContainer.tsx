import { Snippet } from "@prisma/client";
import SnippetMD from "./SnippetMD";

// TODO: better typing
export default function MDSnippetContainer({
  snippet,
  handleSnippetTitleChange,
  handleSnippetContentChange,
}: {
  snippet: Snippet;
  handleSnippetTitleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSnippetContentChange;
}) {
  const updateSnippet = async () => {
    try {
      const res = await fetch(`http://localhost:8080/snippets/${snippet.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: snippet.created_by, title: snippet.title, content: snippet.content }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <input
        onChange={handleSnippetTitleChange}
        defaultValue={snippet?.title || ""}
        placeholder="New Snippet Title"
        id="snippetTitle"
      ></input>
      <SnippetMD content={snippet?.content || ""} handleSnippetContentChange={handleSnippetContentChange} />
      <button onClick={updateSnippet} className="bg-black p-4 text-white">
        Save Snippet
      </button>
    </>
  );
}
