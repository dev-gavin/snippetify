import express from "express";
import morgan from "morgan";
import cors from "cors";
import { CreateSnippetReq, GetSnippetByIdReq } from "../types/api/api.types";
import { createSnippet, getSnippetById } from "../db/dbUtils";

const app = express();

app.use(morgan("dev")); // use morgan middleware globally
app.use(cors());
app.use(express.json()); // allows client to send json

app.use(express.urlencoded({ extended: true })); // de/encodes url properly to help handle query strings
// urlencoded turns params of url into object on the req.params prop

app.get("/snippets", async (req: GetSnippetByIdReq, res) => {
  const { snippetId } = req.query;
  const snippet = await getSnippetById({ snippetId });

  res.send(snippet);
});

app.post("/snippets", async (req: CreateSnippetReq, res) => {
  const { title, content, userId } = req.body;

  const createdSnippet = await createSnippet({ title, content, userId });

  res.send(createdSnippet);
});

export default app;
