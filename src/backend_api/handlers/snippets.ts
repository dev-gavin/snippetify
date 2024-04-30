import { RequestHandler } from "express";
import prisma from "../db";

// TODO: add error handling for handler with `where` clauses to handle error if record not found

export const getSnippetById: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    if (typeof id != "number") {
        next(new Error("'id' passed to param is of wrong type"));
        return;
    }

    const snippet = await prisma.snippet.findUnique({
        where: {
            id,
        },
    });
    res.json({ data: snippet });
};

export const getSnippetsByUserId: RequestHandler = async (req, res, next) => {
    const userId = req.query.userId;
    if (typeof userId != "number") {
        next(new Error("'userId' passed to param is of wrong type"));
        return;
    }

    const snippets = await prisma.snippet.findMany({
        where: {
            created_by: userId,
        },
    });
    res.json({ data: snippets });
};

export const createSnippet: RequestHandler = async (req, res) => {
    const { body } = req;

    if (!body.title) {
        body.title = "{NEW SNIPPET}";
    }

    if (!body.content) {
        body.content = "{NEW SNIPPET}";
    }

    const { title, userId, content } = body;

    const createdSnippet = await prisma.snippet.create({
        data: {
            title: title,
            content: content,
            created_by: userId,
        },
    });

    res.json({ data: createdSnippet });
};

export const updateSnippet: RequestHandler = async (req, res, next) => {
    const { title, content, userId } = req.body;
    const snippetId = req.params.id;

    if (typeof snippetId != "number") {
        next(new Error("'snippetId' passed to param is of wrong type"));
        return;
    }

    const updatedSnippet = await prisma.snippet.update({
        where: {
            created_by: userId,
            id: snippetId,
        },
        data: {
            title,
            content,
        },
    });

    res.json({ data: updatedSnippet });
};
