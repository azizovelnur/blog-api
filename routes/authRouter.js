import { Router } from "express"
import { register, login, getMe } from "../controllers/authController.js"
import checkAuth from "../utils/checkAuth.js"

const authRouter = new Router()
authRouter.post("/register", register)
authRouter.post("/login", checkAuth, login)
authRouter.get("/me", checkAuth, getMe)
export { authRouter }
