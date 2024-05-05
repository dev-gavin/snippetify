import { Snippet } from "../../types";

type SnippetDrawerCardProps = {
  snippet: Snippet;
  handleChangeCurrentSnippet: (id: number) => void;
};

const SnippetDrawerCard = ({
  snippet,
  handleChangeCurrentSnippet,
}: SnippetDrawerCardProps) => {
  return (
    <div
      className="w-[200px] cursor-pointer bg-gray-50 p-4 hover:bg-sky-50"
      onClick={() => handleChangeCurrentSnippet(snippet.id)}
    >
      <p className="my-2 font-bold">{shorten(snippet.title, 20)}</p>
      <p className="mt-2 bg-lime-500 text-sm text-gray-800">
        {snippet.created_by}
      </p>
    </div>
  );
};

const shorten = (text: string | null, textLength = 50) => {
  if (!text) return "";

  if (text.length > textLength) {
    text = text.substring(0, textLength) + "…";
  }
  return text;
};

export default SnippetDrawerCard;
