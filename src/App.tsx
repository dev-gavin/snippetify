import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MDEditor from "./components/MDEditor";
import { Snippet } from "@prisma/client";
import Sidebar from "./components/Sidebar";

function App() {
  // NOTE: just for testing
  const userId = 1;

  const [currentSnippet, setCurrentSnippet] = useState<Snippet>();
  const [snippets, setSnippets] = useState<Snippet[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/snippets?userId=${userId}`,
        );
        const snippets = await res.json();
        setCurrentSnippet(snippets[0]);
        setSnippets(snippets);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSnippet();
  }, []);

  return (
    <>
      {!isLoading && (
        <div>
          <ul>
            <li>
              <Link className="bg-sky-500" to="/jira">
                Link to JIRA
              </Link>
            </li>
          </ul>
          <main className="flex gap-4">
            <Sidebar snippets={snippets} />
            <div className="w-full">
              <input defaultValue={currentSnippet?.title}></input>
              <MDEditor content={currentSnippet?.content || "no content"} />
            </div>
          </main>
        </div>
      )}
    </>
  );
}

export default App;
