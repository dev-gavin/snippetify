import { useEffect, useState } from "react";
import { Snippet } from "../types";
import { getSnippetsByUserId } from "../frontend_api/requests";

export const useFetchUserSnippets = (userId: number) => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        // TODO: there needs to be better error handling here. What if we get an error
        const { data } = await getSnippetsByUserId({ userId });

        const snippets = data.map((snippet: Snippet, index: number) => {
          return {
            ...snippet,
            isCurrentSnippet: index == 0 ? true : false,
          };
        });

        setSnippets(snippets);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSnippets();
  }, [userId]);

  return [snippets, setSnippets] as const;
};
