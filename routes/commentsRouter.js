import { Router } from "express"
import { checkAuth } from "../utils/checkAuth.js"
import { createComment } from "../controllers/commentsController.js"
const commentsRouter = new Router()

commentsRouter.post("/:id", checkAuth, createComment)

export { commentsRouter }
