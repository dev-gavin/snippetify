import { Snippet as PrismaSnippet } from "@prisma/client";

export type Snippet = PrismaSnippet & { isCurrentSnippet: boolean };

export type EditableTSnippetFields = Pick<
  Snippet,
  "title" | "content" | "isCurrentSnippet"
>;

export type SnippetChangeHandler = <P extends keyof EditableTSnippetFields>(
  prop: P,
  value: Snippet[P],
) => void;
