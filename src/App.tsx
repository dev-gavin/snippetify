import Markdown from "react-markdown";
import { useState } from "react";

function App() {
  const [markdownInput, setMarkdownInputs] = useState<string>();
  const [lineCount, setLineCount] = useState<number>(() => 1);
  const markdownPlaceholder = `# Markdown goes here...`;

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const textAreaElement = event.target;
    const input = textAreaElement.value;

    setLineCount(input.split("").filter((char) => char == "\n").length + 1);
    setMarkdownInputs(input);
  }

  const markdownClasses = markdownInput ? "markdown" : "markdown placeholder";

  function handleClick() {
    console.log("clicked");
  }

  return (
    <>
      <div className="container">
        <textarea
          placeholder={markdownPlaceholder}
          className="markdown-input"
          name="markdownInput"
          onChange={handleChange}
          rows={lineCount}
        ></textarea>
        <Markdown className={markdownClasses}>
          {markdownInput || markdownPlaceholder}
        </Markdown>
        {/* <Markdown className="markdown">{test}</Markdown> */}
      </div>
      <button onClick={handleClick}>Submit</button>
    </>
  );
}

export default App;
