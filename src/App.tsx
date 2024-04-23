import { useEffect, useState } from "react";
import { Snippet } from "@prisma/client";
import Sidebar from "./components/Sidebar";
import MDSnippetContainer from "./components/SnippetContainer";

export default function App() {
  // NOTE: just for testing
  const userId = 1;
  const { snippets, setSnippets } = useFetchUserSnippets(userId);
  const [currentSnippet, setCurrentSnippet] = useState<Snippet>();

  if (snippets.length > 0 && !currentSnippet) {
    setCurrentSnippet(snippets[0]);
  }

  const handleSnippetTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSnippet((prev) => {
      return { ...prev, title: event.target.value };
    });

    setSnippets((prev) => {
      return prev.map((snippet) =>
        snippet.id === currentSnippet?.id ? { ...snippet, title: event.target.value } : snippet,
      );
    });
  };

  const handleSnippetContentChange = (markdown: string) => {
    setCurrentSnippet((prev) => {
      return { ...prev, content: markdown };
    });

    setSnippets((prev) => {
      return prev.map((snippet) => (snippet.id === currentSnippet?.id ? { ...snippet, content: markdown } : snippet));
    });
  };

  return (
    <>
      <div>
        <main className="flex gap-4">
          <>
            <Sidebar snippets={snippets} />
            <div className="w-full">
              <MDSnippetContainer
                snippet={currentSnippet}
                setCurrentSnippet={setCurrentSnippet}
                handleSnippetContentChange={handleSnippetContentChange}
                handleSnippetTitleChange={handleSnippetTitleChange}
              />
            </div>
          </>
        </main>
      </div>
    </>
  );
}

const useFetchUserSnippets = (userId: number) => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const res = await fetch(`http://localhost:8080/snippets?userId=${userId}`);
        const { data } = await res.json();

        if (data) {
          setSnippets(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchSnippets();
  }, [userId]);

  return { snippets, setSnippets };
};
