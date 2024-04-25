import { Snippet } from "../types";

type SidebarProps = {
    snippets: Snippet[];
    handleChangeCurrentSnippet: (id: number) => void;
};

const Sidebar = ({ snippets, handleChangeCurrentSnippet }: SidebarProps) => {
    return (
        <>
            <aside className="w-[15%] bg-red-200 p-4">
                <input className="w-full p-2" type="text" placeholder="Search..." />
                <div className="mt-4">
                    {snippets.length > 0 &&
                        snippets.map((snippet) => {
                            return (
                                <a key={snippet.id} onClick={() => handleChangeCurrentSnippet(snippet.id)}>
                                    <div className="border-b border-blue-50 pl-4 hover:bg-red-900">
                                        <h2 className="my-2 font-bold">{snippet.title}</h2>
                                        <p>{shorten(snippet.content)}</p>
                                        <p className="mt-2 text-sm text-gray-800">{snippet.created_by}</p>
                                    </div>
                                </a>
                            );
                        })}
                </div>
            </aside>
        </>
    );
};

const shorten = (text: string | null, textLength = 50) => {
    if (!text) return "";

    if (text.length > textLength) {
        text = text.substring(0, textLength) + "…";
    }
    return text;
};

export default Sidebar;
