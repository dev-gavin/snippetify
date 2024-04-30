import { useEffect, useState } from "react";
import { Snippet } from "../types";

export const useFetchUserSnippets = (userId: number) => {
    const [snippets, setSnippets] = useState<Snippet[]>([]);

    useEffect(() => {
        const fetchSnippets = async () => {
            try {
                const res = await fetch(
                    `http://localhost:8080/snippets?userId=${userId}`,
                );
                const { data } = await res.json();

                data.forEach((snippet: Snippet, index: number) => {
                    index == 0
                        ? (snippet.isCurrentSnippet = true)
                        : (snippet.isCurrentSnippet = false);
                });

                setSnippets(data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchSnippets();
    }, [userId]);

    return [snippets, setSnippets] as const;
};
