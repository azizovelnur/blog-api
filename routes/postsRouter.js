import { Router } from "express"
import {
  createPost,
  deletePost,
  updatePost,
  getOnePost,
  getPosts,
} from "../controllers/postsController.js"
import { checkAuth } from "../utils/checkAuth.js"
import { handleValidationErrors } from "../validations/handleValidationErrors.js"
import { postCreateValidation } from "../validations/authValidation.js"

const postsRouter = new Router()
postsRouter.post(
  "/",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  createPost
)
postsRouter.patch(
  "/:id",
  checkAuth,
  handleValidationErrors,
  handleValidationErrors,
  updatePost
)
postsRouter.delete("/:id", checkAuth, deletePost)
postsRouter.get("/", getPosts)
postsRouter.get("/:id", getOnePost)
export { postsRouter }
