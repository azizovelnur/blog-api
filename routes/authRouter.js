import { Router } from "express"
import { register, login, getMe } from "../controllers/authController.js"
import { checkAuth } from "../utils/checkAuth.js"
import { handleValidationErrors } from "../validations/handleValidationErrors.js"
import {
  loginValidation,
  registerValidation,
} from "../validations/authValidation.js"

const authRouter = new Router()
authRouter.post(
  "/register",
  registerValidation,
  handleValidationErrors,
  register
)
authRouter.post("/login", loginValidation, handleValidationErrors, login)
authRouter.get("/me", checkAuth, getMe)
export { authRouter }
