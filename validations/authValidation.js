import { body } from "express-validator"

export const loginValidation = [
  body("email", "The invalid email format").isEmail(),
  body("password", "The password must be at least 5 characters long").isLength({
    min: 5,
  }),
]

export const registerValidation = [
  body("email", "The invalid email format").isEmail(),
  body("password", "The password must be at least 5 characters long").isLength({
    min: 5,
  }),
  body("name", "Enter name").isLength({ min: 3 }),
  body("avatarUrl", "Invalid link to the avatar").optional().isURL(),
]

export const postCreateValidation = [
  body("title", "Enter the title of the article")
    .isLength({ min: 3 })
    .isString(),
  body("text", "Enter the text of the article").isLength({ min: 3 }).isString(),
  body("postImage", "Invalid link to the avatar").optional().isString(),
]
