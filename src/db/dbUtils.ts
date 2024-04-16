import { PrismaClient } from "@prisma/client";
import { CreateSnippetFields, GetSnippetByIdFields } from "../types/front-end/endPoints";

const { snippet, user } = new PrismaClient();

export async function createSnippet({ title, content, userId }: CreateSnippetFields) {
  return await snippet.create({
    data: {
      title: title,
      content: content,
      created_by: Number(userId),
    },
  });
}

export async function getSnippetById({ snippetId }: { snippetId: number }) {
  try {
    return await snippet.findUnique({
      where: {
        id: snippetId,
      },
    });
  } catch (e) {
    console.log(e);
    return {};
  }
}

export async function getSnippetsByUserId({ userId }: { userId: number }) {
  try {
    return await snippet.findMany({
      where: {
        created_by: userId,
      },
    });
  } catch (e) {
    console.log(e);
  }
}
