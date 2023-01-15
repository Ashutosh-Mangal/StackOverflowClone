import express from "express";

import {
  addComment,
  deleteComment,
  editComment,
} from "../controllers/Comment.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", addComment);
// router.get("/get", getAllQuestions);
router.delete("/delete/:questionId/:questionCommentId", deleteComment);
router.patch("/edit/:questionId/:questionCommentId", editComment);

export default router;
