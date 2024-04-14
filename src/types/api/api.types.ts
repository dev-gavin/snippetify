import { Request } from "express";
import {
  CreateSnippetFields,
  GetSnippetByIdFields,
} from "../front-end/endPoints";

export type CreateSnippetReq = Request<{}, {}, CreateSnippetFields>;

export type GetSnippetByIdReq = Request<{}, {}, {}, GetSnippetByIdFields>;
