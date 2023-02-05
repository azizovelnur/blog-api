import { Router } from "express"
import {
  createPost,
  deletePost,
  updatePost,
  getOnePost,
  getPosts,
  getPostComments,
  getPopularPosts,
} from "../controllers/postsController.js"
import { checkAuth } from "../utils/checkAuth.js"

const postsRouter = new Router()
postsRouter.post("/", checkAuth, createPost)
postsRouter.patch("/:id", checkAuth, updatePost)
postsRouter.delete("/:id", checkAuth, deletePost)
postsRouter.get("/", getPosts)
postsRouter.get("/popular", getPopularPosts)
postsRouter.get("/:id", getOnePost)
postsRouter.get("/comments/:id", getPostComments)
export { postsRouter }
