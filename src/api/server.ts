import express from "express";
import morgan from "morgan";
import cors from "cors";
import { parseQueries } from "../utils/middleware";
import { query, validationResult, param, body } from "express-validator";
import { createSnippet, getSnippetById, getSnippetsByUserId } from "../db/dbUtils";

const app = express();

app.use(morgan("dev")); // use morgan middleware globally
app.use(cors());

app.use(express.urlencoded({ extended: true })); // de/encodes url properly to help handle query strings
// urlencoded turns params of url into object on the req.params prop
//
// app.use(parseQueries);

const getSnippetsValidators = [query("userId").exists().toInt()];

app.get("/snippets", getSnippetsValidators, async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    res.status(404).send(result.array());
  }

  if (req.query.userId) {
    const snippets = await getSnippetsByUserId({ userId: req.query.userId });
    if (snippets?.length > 0) {
      res.json(snippets);
    } else {
      res.status(404);
      res.send(`no snippets found for userId: ${req.query.userId}`);
    }
  } else {
    res.status(400);
    res.send("invalid parameters");
  }
});

app.get("/snippets/:snippetId", param("snippetId").toInt(), async (req, res) => {
  try {
    const snippet = await getSnippetById({
      snippetId: Number(req?.params?.snippetId),
    });
    if (snippet) {
      res.json(snippet);
    } else {
      res.status(404).send(`no snippet found for snippet id: ${req?.params?.snippetId}`);
    }
  } catch (e) {
    console.log(e);
  }
});

app.post("/snippets", async (req, res) => {
  const { title, content, userId } = req.body;

  const createdSnippet = await createSnippet({ title, content, userId });

  res.send(createdSnippet);
});

const testValidationChain = [query("test").exists().isIn(["yes", "no"]), query("test2").exists()];

app.get("/test", testValidationChain, async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(404).send(result.array());
  }
});

export default app;
