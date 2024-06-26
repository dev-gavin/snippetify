import { requestHandler } from "./requestHandler";
import { API_BASE_URL } from "../config";
import { Snippet } from "@prisma/client";

const SNIPPETS_BASE_URL = API_BASE_URL + "/snippets";

type UserParams = {
  userId: number;
};

export const getSnippetsByUserId = requestHandler<UserParams, Snippet[]>(
  (params) => {
    let url = SNIPPETS_BASE_URL;

    const searchParams = new URLSearchParams(params as unknown as string);
    url = url + `?${searchParams}`;
    return fetch(url);
  },
);

type SaveSnippetParams = {
  snippetId: number;
  userId: number;
  title: string;
  content: string;
};

export const saveSnippet = requestHandler<SaveSnippetParams, never>(
  (params) => {
    const url = SNIPPETS_BASE_URL;
  },
);
