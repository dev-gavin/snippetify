import { Router } from "express";
import { handleInputErrors } from "./middleware/middleware";
import { getSnippetById, getSnippetsByUserId, createSnippet } from "./handlers/snippets";
import { body, param, query } from "express-validator";

const router = Router();

//
// Snippets
//
//
router.get("/snippets/:id", param("id").exists().isNumeric().toInt(), handleInputErrors, getSnippetById);
router.get("/snippets", query("userId").exists().isNumeric().toInt(), handleInputErrors, getSnippetsByUserId);
router.post(
  "/snippets",
  body("title").exists().notEmpty(),
  body("content").exists().notEmpty(),
  body("userId").exists().isNumeric().toInt(),
  handleInputErrors,
  createSnippet,
);

export default router;
