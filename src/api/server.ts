import express from "express";
import morgan from "morgan";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { CreateSnippetReq } from "../types/api/api.types";

const prisma = new PrismaClient();

const app = express();

app.use(morgan("dev")); // use morgan middleware globally
app.use(cors());
app.use(express.json()); // allows client to send json

app.use(express.urlencoded({ extended: true })); // de/encodes url properly to help handle query strings
// urlencoded turns params of url into object on the req.params prop

app.get("/snippets/:snippetId", async (req, res) => {
  const snippetId = req.params;

  res.send();
});

app.post("/snippets", async (req: CreateSnippetReq, res) => {
  const { title, content, userId } = req.body;

  const createdSnippet = await prisma.snippet.create({
    data: {
      title: title,
      content: content,
      created_by: Number(userId),
    },
  });

  res.send(createdSnippet);
});

export default app;
