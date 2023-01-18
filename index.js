import express, { json } from "express"
import fs from "fs"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import multer from "multer"
import { authRouter } from "./routes/authRouter.js"
import { checkAuth } from "./utils/checkAuth.js"
import { postsRouter } from "./routes/postsRouter.js"

const app = express()
dotenv.config()
app.use(json())
app.use(cors())
app.use("/auth", authRouter)
app.use("/posts", postsRouter)

//console fix error
mongoose.set("strictQuery", true)

const PORT = process.env.PORT || 5001
const DBCONNECT = process.env.DBCONNECT

const start = async function () {
  try {
    await mongoose.connect(DBCONNECT)
    console.log("db connected")
    app.listen(PORT, function () {
      console.log(`server started on port: ${PORT}`)
    })
  } catch (error) {
    console.log("function not running: " + error)
  }
}
start()
//multer
app.use("/uploads", express.static("uploads"))
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads")
    }
    cb(null, "uploads")
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  })
})
