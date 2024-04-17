import { PrismaClient } from "@prisma/client";

const { snippet, user } = new PrismaClient();

export async function createSnippet({ title, content, userId }) {
  return {};
  try {
    return await snippet.create({
      data: {
        title: title,
        content: content,
        created_by: Number(userId),
      },
    });
  } catch (e) {
    console.log(e);
  }
}

export async function getSnippetById(snippetId: number) {
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

export async function getSnippetsByUserId(userId: number) {
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
