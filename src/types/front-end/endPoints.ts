export type CreateSnippetFields = {
  title: string;
  content: string | undefined;
  userId: number;
};

export type GetSnippetByIdFields = {
  snippetId: number;
};
