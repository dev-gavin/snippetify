import SnippetMD from "./SnippetMD";
import { SnippetChangeHandler, Snippet } from "../types";

// TODO: better typing
type MDSnippetContainerProps = {
    snippet: Snippet;
    handleSnippetChange: SnippetChangeHandler;
};

export default function MDSnippetContainer({
    snippet,
    handleSnippetChange,
}: MDSnippetContainerProps) {
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
                onChange={(e) => handleSnippetChange("title", e.target.value)}
                value={snippet?.title}
                placeholder="New Snippet Title"
                id="snippetTitle"
            ></input>
            <SnippetMD
                content={snippet?.content}
                handleSnippetChange={handleSnippetChange}
            />
            <button
                onClick={saveSnippetToDb}
                className="bg-black p-4 text-white"
            >
                Save Snippet
            </button>
        </>
    );
}
