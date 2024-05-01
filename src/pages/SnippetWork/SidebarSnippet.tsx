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
        <a
            key={snippet.id}
            onClick={() => handleChangeCurrentSnippet(snippet.id)}
        >
            <div className="border-b border-blue-50 pl-4 hover:bg-red-900">
                <h2 className="my-2 font-bold">{snippet.title}</h2>
                <p>{shorten(snippet.content)}</p>
                <p className="mt-2 text-sm text-gray-800">
                    {snippet.created_by}
                </p>
            </div>
        </a>
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
