import { Request } from "express";
import {
  CreateSnippetFields,
  GetSnippetByIdFields,
} from "../front-end/endPoints";

// TODO: use PRISMA types to makes these

export type CreateSnippetReq = Request<{}, {}, CreateSnippetFields>;

export type GetSnippetByIdReq = Request<{}, {}, {}, GetSnippetByIdFields>;
