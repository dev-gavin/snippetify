import SnippetDrawer from "./SnippetDrawer";
import CurrentSnippet from "./CurrentSnippet";
import { SnippetChangeHandler } from "../../types";
import { useFetchUserSnippets } from "../../hooks/useFetchUserSnippets";

export default function SnippetWork() {
  // TODO: fix this in future to grab the user ID from somewhere else
  const userId = 1;

  const [snippets, setSnippets] = useFetchUserSnippets(userId);
  if (snippets.length == 0) return;

  const currentSnippet = snippets.find(
    (snippet) => snippet.isCurrentSnippet == true,
  );

  const handleSnippetChange: SnippetChangeHandler = (prop, value) => {
    setSnippets((prev) => {
      return prev.map((snippet) =>
        snippet.id === currentSnippet?.id
          ? { ...snippet, [prop]: value }
          : snippet,
      );
    });
  };

  const handleCreateSnippet = async () => {
    try {
      const res = await fetch(`http://localhost:8080/snippets/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const { data: createdSnippet } = await res.json();

      setSnippets((previous) => {
        const updatedArray = previous.map((snippet) => {
          if (snippet.isCurrentSnippet)
            return { ...snippet, isCurrentSnippet: false };
          return snippet;
        });
        return [...updatedArray, { ...createdSnippet, isCurrentSnippet: true }];
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="mx-auto w-[75%] max-w-[1500px]">
        <>
          <div>
            {currentSnippet && (
              <CurrentSnippet
                snippet={currentSnippet}
                handleSnippetChange={handleSnippetChange}
              />
            )}
          </div>

          <SnippetDrawer snippets={snippets} setSnippets={setSnippets} />
          <button onClick={handleCreateSnippet} className="pointer bg-sky-50">
            CREATE SNIPPET
          </button>
        </>
      </main>
    </>
  );
}
