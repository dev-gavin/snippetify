import { useEffect, useState } from "react";
import { Snippet } from "@prisma/client";
import Sidebar from "./components/Sidebar";
import MDSnippetContainer from "./components/SnippetContainer";

type FrontSnippet = Omit<Snippet, "id">;

export default function App() {
  // NOTE: just for testing
  const userId = 1;
  const snippets = useFetchUserSnippets(userId);
  const [currentSnippet, setCurrentSnippets] = useState(snippets[0]);

  const handleSnippetChange = ({ target }) => {};

  return (
    <>
      <div>
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
