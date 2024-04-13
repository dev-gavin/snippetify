import express from "express";
import morgan from "morgan";
import { createSnippet, getSnippet } from "../db";

const app = express();

app.use(morgan("dev")); // use morgan middleware globally
app.use(express.json()); // allows client to send json
app.use(express.urlencoded({ extended: true })); // de/encodes url properly to help handle query strings
// urlencoded turns params of url into object on the req.params prop

// TODO: need to the snippet ID more clear, it actually passing an object
app.get("/snippets/:snippetId", async (req, res) => {
  const snippetId = req.params;

  console.log(await getSnippet(snippetId));
  res.send();
});

app.post("/snippets", async (req, res) => {
  const snippetData = req.body;
  console.log(await createSnippet(snippetData));

  res.send();
});

export default app;
