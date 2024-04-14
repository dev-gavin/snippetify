import { Request } from "express";
import { CreateSnippetFields } from "../front-end/endPoints";

export type CreateSnippetReq = Request<{}, {}, CreateSnippetFields>;
