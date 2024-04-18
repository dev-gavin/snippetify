import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Snippet } from "@prisma/client";
import Sidebar from "./components/Sidebar";
import MDSnippet from "./components/MDSnippet";

function App() {
  // NOTE: just for testing
  const userId = 1;

  const [currentSnippet, setCurrentSnippet] = useState<Snippet>();
  const [snippets, setSnippets] = useState<Snippet[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const res = await fetch(`http://localhost:8080/snippets?userId=${userId}`);
        const { data } = await res.json();
        setCurrentSnippet(data[0]);
        setSnippets(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSnippets();
  }, []);

  return (
    <>
      <div>
        <ul>
          <li>
            <Link className="bg-sky-500" to="/jira">
              Link to JIRA
            </Link>
          </li>
        </ul>
        <main className="flex gap-4">
          {!isLoading && (
            <>
              <Sidebar snippets={snippets} />
              <div className="w-full">
                <MDSnippet snippet={currentSnippet} />
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}

export default App;
