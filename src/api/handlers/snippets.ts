import prisma from "../db";
import { Request, Response } from "express";

export async function getSnippetById(req: Request, res: Response) {
  const id = req.params.id;

  const snippet = await prisma.snippet.findUnique({
    where: {
      id,
    },
  });
  res.json({ data: snippet });
}

export async function getSnippetsByUserId(req: Request, res: Response) {
  const userId = req.query.userId;

  const snippets = await prisma.snippet.findMany({
    where: {
      created_by: userId,
    },
  });
  res.json({ data: snippets });
}

export async function createSnippet(req: Request, res: Response) {
  const { title, content, userId } = req.body;

  const createdSnippet = await prisma.snippet.create({
    data: {
      title: title,
      content: content,
      created_by: userId,
    },
  });

  res.json({ data: createdSnippet });
}
