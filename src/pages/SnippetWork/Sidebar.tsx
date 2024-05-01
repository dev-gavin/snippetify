import { Snippet } from "../../types";
import SidebarSnippet from "./SidebarSnippet";

type SidebarProps = {
    snippets: Snippet[];
    handleChangeCurrentSnippet: (id: number) => void;
};

const Sidebar = ({ snippets, handleChangeCurrentSnippet }: SidebarProps) => {
    return (
        <>
            <aside className="w-[15%] bg-red-200 p-4">
                <input
                    className="w-full p-2"
                    type="text"
                    placeholder="Search..."
                />
                <div className="mt-4">
                    {snippets.length > 0 &&
                        snippets.map((snippet) => (
                            <SidebarSnippet
                                snippet={snippet}
                                handleChangeCurrentSnippet={
                                    handleChangeCurrentSnippet
                                }
                            />
                        ))}
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
