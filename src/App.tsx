import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import testSnippets from "./testSnippets.json";
import MDEditor from "./components/MDEditor";

function shorten(text: string, textLength = 50) {
  if (text.length > textLength) {
    text = text.substring(0, textLength) + "…";
  }
  return text;
}

function App() {
  const [currentSnippet, setCurrentSnippet] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchSnippet = async () => {
      try {
        const res = await fetch("http://localhost:8080/snippets/1");
        const snippet = await res.json();
        setCurrentSnippet(snippet);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSnippet();
  }, []);

  // console.log("test", currentSnippet);

  return (
    <>
      <ul>
        <li>
          <Link className="bg-sky-500" to="/jira">
            Link to JIRA
          </Link>
        </li>
      </ul>
      <main className="flex gap-4">
        <aside className="w-[15%] bg-red-200 p-4">
          <input className="w-full p-2" type="text" placeholder="Search..." />
          <div className="mt-4">
            {testSnippets.map((snippet) => (
              <>
                <a href="#">
                  <div className="border-b border-blue-50 pl-4 hover:bg-red-900">
                    <h2 className="my-2 font-bold">{snippet.title}</h2>
                    <p>{shorten(snippet.content)}</p>
                    <p className="mt-2 text-sm text-gray-800">
                      {snippet.author}
                    </p>
                  </div>
                </a>
              </>
            ))}
          </div>
        </aside>
        {!isLoading && (
          <>
            <div className="w-full">
              <h1>{currentSnippet?.title}</h1>
              <MDEditor content={currentSnippet?.content || "no content"} />
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default App;
