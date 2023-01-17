import { Router } from "express"
import {
  createPost,
  deletePost,
  updatePost,
  getOnePost,
  getPosts,
} from "../controllers/postsController.js"
import checkAuth from "../utils/checkAuth.js"

const postsRouter = new Router()
postsRouter.post("/", checkAuth, createPost)
postsRouter.patch("/:id", checkAuth, updatePost)
postsRouter.delete("/:id", checkAuth, deletePost)
postsRouter.get("/", getPosts)
postsRouter.get("/:id", getOnePost)
export { postsRouter }
