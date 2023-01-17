import UserModel from "../models/UserModel.js"
import jsonwebtoken from "jsonwebtoken"
import bcrpty from "bcrypt"

export const register = async function (req, res) {
  try {
    const { password, email, username } = req.body
    const salt = await bcrpty.genSalt(10)
    const hash = await bcrpty.hash(password, salt)

    const newUser = new UserModel({
      name: username,
      email: email,
      passwordHash: hash,
    })

    const user = await newUser.save() //save user in database

    const token = jsonwebtoken.sign(
      {
        _id: user._id,
      },
      "secretId",
      { expiresIn: "30d" }
    )

    res.json({
      ...user._doc,
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "user already exists",
    })
  }
}

export const login = async function (req, res) {
  try {
    const findUser = await UserModel.findOne({ email: req.body.email })

    if (!findUser) {
      return res.status(400).json({ error: "wrong email" })
    }

    const isValidPassword = await bcrpty.compare(
      req.body.password,
      findUser._doc.passwordHash
    )

    if (!isValidPassword) {
      return res.status(400).json({ error: "wrong pasword" })
    }

    const token = jsonwebtoken.sign(
      {
        _id: findUser._doc._id,
      },
      "secretId",
      { expiresIn: "30d" }
    )

    res.json({
      ...findUser._doc,
      token,
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: "authorization error login",
    })
  }
}

export const getMe = async function (req, res) {
  try {
    const user = await UserModel.findById(req.userId)

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      })
    }

    const { passwordHash, ...userData } = user._doc

    res.json(userData)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "access denied",
    })
  }
}
