import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const register = async function (req, res) {
  try {
    const { email, name, password } = req.body

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const newUser = await prisma.user.create({
      data: {
        email: email,
        userName: name,
        passwordHash: hash,
      },
    })

    const token = jsonwebtoken.sign(
      {
        id: newUser.id,
      },
      "secretId",
      { expiresIn: "30d" }
    )
    res.json({ ...newUser, token })
  } catch (error) {
    console.log(error)
  }
}

export const login = async function (req, res) {
  try {
    const foundUser = await prisma.user.findUnique({
      where: { email: req.body.email },
    })

    if (!foundUser) {
      return res.status(400).json({ error: "wrong email" })
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      foundUser.passwordHash
    )

    if (!isValidPassword) {
      return res.status(400).json({ error: "wrong pasword" })
    }

    const token = jsonwebtoken.sign(
      {
        id: foundUser.id,
      },
      "secretId",
      { expiresIn: "30d" }
    )
    res.json({ ...foundUser, token })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "authorization error login",
    })
  }
}

export const getMe = async function (req, res) {
  try {
    // this userId has been taken from checkAuth.js
    const user = await prisma.user.findUnique({ where: { id: req.userId } })

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      })
    }

    const { passwordHash, ...userData } = user
    res.json(userData)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "access denied from controller",
    })
  }
}
