import { Router } from "express"
import { checkAuth } from "../utils/checkAuth.js"
import {
  createComment,
  deleteComment,
} from "../controllers/commentsController.js"
const commentsRouter = new Router()

commentsRouter.post("/:id", checkAuth, createComment)
commentsRouter.delete("/:postId/:commentId", checkAuth, deleteComment)

export { commentsRouter }
