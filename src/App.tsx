import { useEffect, useState } from "react";
import { Snippet } from "@prisma/client";
import Sidebar from "./components/Sidebar";
import MDSnippetContainer from "./components/SnippetContainer";
import { SnippetChangeHandler } from "./types";

export type TSnippet = Snippet & { isCurrentSnippet: boolean };
export type EditableTSnippetFields = Pick<TSnippet, "title" | "content">;

export default function App() {
  // NOTE: just for testing
  const userId = 1;
  const [snippets, setSnippets] = useFetchUserSnippets(userId);
  if (snippets.length == 0) return;

  const currentSnippet = snippets.find((snippet) => snippet.isCurrentSnippet == true);

  const handleSnippetChange: SnippetChangeHandler = (prop, value) => {
    setSnippets((prev) => {
      return prev.map((snippet) => (snippet.id === currentSnippet?.id ? { ...snippet, [prop]: value } : snippet));
    });
  };

  return (
    <>
      <div>
        <main className="flex gap-4">
          <>
            <Sidebar snippets={snippets} />
            <div className="w-full">
              {currentSnippet && (
                <MDSnippetContainer snippet={currentSnippet} handleSnippetChange={handleSnippetChange} />
              )}
            </div>
          </>
        </main>
      </div>
    </>
  );
}

const useFetchUserSnippets = (userId: number) => {
  const [snippets, setSnippets] = useState<TSnippet[]>([]);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const res = await fetch(`http://localhost:8080/snippets?userId=${userId}`);
        const { data } = await res.json();
        data.forEach((snippet: TSnippet, index: number) => {
          index == 0 ? (snippet.isCurrentSnippet = true) : (snippet.isCurrentSnippet = false);
        });
        setSnippets(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSnippets();
  }, [userId]);

  return [snippets, setSnippets] as const;
};
