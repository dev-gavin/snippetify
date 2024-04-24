import { Router } from "express";
import { handleInputErrors } from "./middleware/middleware";
import { getSnippetById, getSnippetsByUserId, createSnippet, updateSnippet } from "./handlers/snippets";
import { body, param, query } from "express-validator";

const router = Router();

//
// Snippets
//
router.get("/snippets/:id", param("id").exists().isNumeric().toInt(), handleInputErrors, getSnippetById);
router.get("/snippets", query("userId").exists().isNumeric().toInt(), handleInputErrors, getSnippetsByUserId);
router.post(
  "/snippets",
  body("title").optional().notEmpty(),
  body("content").optional().notEmpty(),
  body("userId").exists().isNumeric().toInt(),
  handleInputErrors,
  createSnippet,
);
router.patch(
  "/snippets/:id",
  body("title").exists().notEmpty(),
  body("content").exists().notEmpty(),
  body("userId").exists().isNumeric().toInt(),
  param("id").exists().isNumeric().toInt(),
  handleInputErrors,
  updateSnippet,
);

export default router;
