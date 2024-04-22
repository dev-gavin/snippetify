import { useEffect, useState } from "react";
import { Snippet } from "@prisma/client";
import Sidebar from "./components/Sidebar";
import MDSnippetContainer from "./components/SnippetContainer";

export default function App() {
  // NOTE: just for testing
  const userId = 1;
  const snippets = useFetchUserSnippets(userId);
  const [currentSnippet, setCurrentSnippets] = useState(snippets[0]);

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

  const handleSnippetChange = ({ target }) => {
    console.log(target.value);
  };

  return (
    <>
      <div>
        <button onClick={createSnippet}>Create Snippet</button>
        <main className="flex gap-4">
          <>
            <Sidebar snippets={snippets} />
            <div className="w-full">
              <MDSnippetContainer snippet={currentSnippet} handleSnippetChange={handleSnippetChange} />
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

  return snippets;
};
