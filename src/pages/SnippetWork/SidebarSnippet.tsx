import { Snippet } from "../../types";

type SidebarSnippetProps = {
    snippet: Snippet;
    handleChangeCurrentSnippet: (id: number) => void;
};

const SidebarSnippet = ({
    snippet,
    handleChangeCurrentSnippet,
}: SidebarSnippetProps) => {
    return (
        <div
            className="w-[200px] shrink-0 bg-gray-50 p-4 hover:bg-sky-50"
            onClick={() => handleChangeCurrentSnippet(snippet.id)}
        >
            <p className="my-2 font-bold">{snippet.title}</p>
            <p>{shorten(snippet.content)}</p>
            <p className="mt-2 text-sm text-gray-800">{snippet.created_by}</p>
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

export default SidebarSnippet;
