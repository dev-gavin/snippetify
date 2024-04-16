import { Request } from "express";
import { CreateSnippetFields } from "../front-end/endPoints";

// TODO: use PRISMA types to makes these
//

export type CreateSnippetFields = {
  title: string;
  content: string | undefined;
  userId: number;
};

export type GetSnippetByIdFields = {
  snippetId: number;
};

export type CreateSnippetReq = Request<{}, {}, CreateSnippetFields>;

type GetSnippetQueryParams =
  | { snippetId: number; userId?: never }
  | { userId: number; snippetId?: never };
export type GetSnippetByIdReq = Request<{}, {}, {}, GetSnippetQueryParams>;
