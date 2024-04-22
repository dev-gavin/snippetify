import { useEffect, useState } from "react";
import { Snippet } from "@prisma/client";
import Sidebar from "./components/Sidebar";
import MDSnippetContainer from "./components/SnippetContainer";

export default function App() {
  // NOTE: just for testing
  const userId = 1;
  const { currentSnippet, setCurrentSnippet, snippets } = useFetchUserSnippets(userId);

  const createSnippet = async () => {
    try {
      const newSnippet = {
        title: "test title",
        content: "test content",
        userId: userId,
      };

      const res = await fetch(`http://localhost:8080/snippets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSnippet),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // TODO: better typing
  const handleSnippetTitleChange = ({ target }) => {
    setCurrentSnippet((prev) => {
      return { ...prev, title: target.value };
    });
  };

  // TODO: better typing
  const handleSnippetContentChange = (content) => {
    console.log(content);
    setCurrentSnippet((prev) => {
      return { ...prev, content: content };
    });
  };

  console.log(currentSnippet);
  return (
    <>
      <div>
        <button onClick={createSnippet}>Create Snippet</button>
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
