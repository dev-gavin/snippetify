import express from "express";
import morgan from "morgan";
import { createSnippet } from "../db";

const app = express();

app.use(morgan("dev")); // use morgan middleware globally
app.use(express.json()); // allows client to send json
app.use(express.urlencoded({ extended: true })); // de/encodes url properly to help handle query strings
// urlencoded turns params of url into object on the req.params prop

app.get("/snippets/:id", (req, res) => {
  const snippetId = req.params.id;
  console.log(snippetId);
  res.send();
});

app.post("/snippets", async (req, res) => {
  const snippetData = req.body;
  console.log(snippetData);
  console.log(await createSnippet(snippetData));

  res.send();
});

export default app;
