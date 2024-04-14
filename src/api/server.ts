import express from "express";
import morgan from "morgan";
import cors from "cors";
import { parseQueries } from "../utils/middleware";
import {
  createSnippet,
  getSnippetById,
  getSnippetsByUserId,
} from "../db/dbUtils";

const app = express();

app.use(morgan("dev")); // use morgan middleware globally
app.use(cors());

app.use(express.urlencoded({ extended: true })); // de/encodes url properly to help handle query strings
// urlencoded turns params of url into object on the req.params prop
//
app.use(parseQueries);

app.get("/snippets", async (req, res) => {
  if (req.query.snippetId) {
    try {
      const snippet = await getSnippetById({ snippetId: req.query.snippetId });
      if (snippet) {
        res.send(snippet);
      } else {
        res.status(404);
        res.send(`no snippet found for snippet id: ${req.query.snippetId}`);
      }
    } catch (e) {
      return e;
    }
  } else if (req.query.userId) {
    const snippets = await getSnippetsByUserId({ userId: req.query.userId });
    if (snippets) {
      res.send(snippets);
    } else {
      res.status(404);
      res.send(`no snippets found for userId: ${req.query.userId}`);
    }
  } else {
    res.status(400);
    res.send("invalid parameters");
  }
});

app.post("/snippets", async (req, res) => {
  const { title, content, userId } = req.body;

  const createdSnippet = await createSnippet({ title, content, userId });

  res.send(createdSnippet);
});

export default app;
