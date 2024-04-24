import SnippetMD from "./SnippetMD";
import { TSnippet, EditableTSnippetFields } from "../App";

// TODO: better typing
type MDSnippetContainerProps = {
  snippet: TSnippet;
  handleSnippetChange: <P extends keyof Pick<EditableTSnippetFields, "title">>(
    prop: P,
    value: EditableTSnippetFields[P],
  ) => void;
};

export default function MDSnippetContainer({ snippet, handleSnippetChange }: MDSnippetContainerProps) {
  //   const saveSnippetToDb = async () => {
  //     try {
  //       const res = await fetch(`http://localhost:8080/snippets/${snippet?.id}`, {
  //         method: "PATCH",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ userId: snippet?.created_by, title: snippet?.title, content: snippet?.content }),
  //       });
  //       const { data: savedSnippet } = await res.json();
  //
  //       setCurrentSnippet(savedSnippet);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <>
      <input
        onChange={(e) => handleSnippetChange("title", e.target.value)}
        defaultValue={snippet?.title}
        placeholder="New Snippet Title"
        id="snippetTitle"
      ></input>
      <SnippetMD content={snippet?.content} handleSnippetChange={handleSnippetChange} />
      <button onClick={console.log} className="bg-black p-4 text-white">
        Save Snippet
      </button>
    </>
  );
}
