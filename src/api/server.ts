import express, { NextFunction, RequestHandler } from "express";
import morgan from "morgan";
import cors from "cors";
import { query, validationResult, param, body } from "express-validator";
import { createSnippet, getSnippetById, getSnippetsByUserId } from "../db/dbUtils";
import { Request, Response } from "express";

const app = express();

app.use(morgan("dev")); // use morgan middleware globally
app.use(cors());

app.use(express.urlencoded({ extended: true })); // de/encodes url properly to help handle query strings
// urlencoded turns params of url into object on the req.params prop

const getSnippetsValidators = [query("userId").exists().notEmpty().toInt()];
app.get("/snippets", getSnippetsValidators, async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).json({ errors: result.array() });

  if (req.query.userId && typeof req.query.userId == "number") {
    const snippets = await getSnippetsByUserId(req.query.userId);

    if (snippets) {
      res.json({ data: snippets });
    } else {
      res.status(404).send(`no snippets found for userId: ${req.query.userId}`);
    }
  } else {
  }
});

const getSnippetByIdValidators = [param("snippetId").toInt()];
app.get("/snippets/:snippetId", getSnippetByIdValidators, async (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).json({ errors: result.array() });

  if (typeof req.params.snippetId == "number") {
    try {
      const snippet = await getSnippetById(req.params.snippetId);
      res.json({ data: snippet });
    } catch (e) {
      const err = new Error(`could not get snippet id: ${req.params.snippetId}`);
      err.statusCode = 500;
      next(err);
    }
  }
});

const createSnippetVaidators = [
  body("title").exists().notEmpty(),
  body("content").exists().notEmpty(),
  body("userId").exists().toInt(),
];
app.post("/snippets", createSnippetVaidators, async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).json({ errors: result.array() });

  const { title, content, userId } = req.body;
  const createdSnippet = await createSnippet({ title, content, userId });
  if (createdSnippet) {
    res.json(createdSnippet);
  } else {
    throw new Error("Could Not Create Snippet");
  }
});

function errorHandler(err, req, res: Response, next) {
  res.status(err.statusCode).json({ errors: err.message });
}

function invalidPathHandler(req: Request, res: Response) {
  res.status(404);
  res.json({ errors: `invalid path:${req.url}` });
}

app.use(invalidPathHandler);
app.use(errorHandler);

export default app;
