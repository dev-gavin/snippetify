import { PrismaClient } from "@prisma/client";
import {
  CreateSnippetFields,
  GetSnippetByIdFields,
} from "../types/front-end/endPoints";

const { snippet, user } = new PrismaClient();

export async function createSnippet({
  title,
  content,
  userId,
}: CreateSnippetFields) {
  return await snippet.create({
    data: {
      title: title,
      content: content,
      created_by: Number(userId),
    },
  });
}

export async function getSnippetById({ snippetId }: GetSnippetByIdFields) {
  console.log(snippetId);
  try {
    return await snippet.findUnique({
      where: {
        id: Number(snippetId),
      },
    });
  } catch (e) {
    console.log(e);
    return {};
  }
}
