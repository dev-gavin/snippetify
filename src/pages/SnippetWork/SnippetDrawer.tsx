import { Snippet } from "../../types";
import SnippetDrawerCard from "./SnippetDrawerCard";

type SidebarProps = {
  snippets: Snippet[];
  setSnippets: React.Dispatch<React.SetStateAction<Snippet[]>>;
};

const SnippetDrawer = ({ snippets, setSnippets }: SidebarProps) => {
  const handleChangeCurrentSnippet = (id: number) => {
    const clickedSnippet = snippets.find((snippet) => snippet.id == id);
    if (clickedSnippet?.isCurrentSnippet) return;

    setSnippets((previous) => {
      return previous.map((snippet) => {
        if (id == snippet.id) return { ...snippet, isCurrentSnippet: true };
        if (snippet.isCurrentSnippet)
          return { ...snippet, isCurrentSnippet: false };
        return snippet;
      });
    });
  };

  return (
    <>
      <div className="bg-red-200 p-4">
        <input className="w-full p-2" type="text" placeholder="Search..." />
        <div className="mt-4 flex flex-wrap gap-4">
          {snippets.length > 0 &&
            snippets.map((snippet) => (
              <SnippetDrawerCard
                key={snippet.id}
                snippet={snippet}
                handleChangeCurrentSnippet={handleChangeCurrentSnippet}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default SnippetDrawer;
