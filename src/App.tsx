import { useEffect, useState } from "react";
import { Snippet } from "@prisma/client";
import Sidebar from "./components/Sidebar";
import MDSnippetContainer from "./components/SnippetContainer";

export default function App() {
  // NOTE: just for testing
  const userId = 1;
  const { currentSnippet, setCurrentSnippet, snippets } = useFetchUserSnippets(userId);

  const handleSnippetTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSnippet((prev) => {
      return { ...prev, title: event.target.value };
    });
  };

  const handleSnippetContentChange = (markdown: string) => {
    setCurrentSnippet((prev) => {
      return { ...prev, content: markdown };
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
  const [currentSnippet, setCurrentSnippet] = useState(snippets[0]);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const res = await fetch(`http://localhost:8080/snippets?userId=${userId}`);
        const { data } = await res.json();

        if (data) {
          setSnippets(data);
          setCurrentSnippet(data[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchSnippets();
  }, [userId]);

  return { currentSnippet, setCurrentSnippet, snippets };
};
