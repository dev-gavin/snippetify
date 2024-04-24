import { Snippet } from "@prisma/client";

export type TSnippet = Snippet & { isCurrentSnippet: boolean };
export type EditableTSnippetFields = Pick<TSnippet, "title" | "content">;

export type SnippetChangeHandler = <P extends keyof EditableTSnippetFields>(prop: P, value: TSnippet[P]) => void;
