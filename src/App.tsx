import MDEditor from "./components/MDEditor";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <ul>
        <li>
          <Link to="/jira">This </Link>
        </li>
      </ul>
      <input type="text" placeholder="Search..." />
      <aside>
        <div className="snippet-aside">
          <h2>Snippet Title</h2>
        </div>
      </aside>
      {/* <MDEditor /> */}
    </>
  );
}

export default App;
