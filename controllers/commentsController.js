import Comment from "../models/CommentsModel.js"
import Post from "../models/PostModel.js"

export const createComment = async (req, res) => {
  try {
    const { postId, comment } = req.body

    if (!comment) return res.json({ message: "The comment cannot be empty" })

    const newComment = new Comment({ comment })
    await newComment.save()

    try {
      await Post.findByIdAndUpdate(postId, {
        $push: { comments: newComment._id },
      })
    } catch (error) {
      console.log(error)
    }

    res.json(newComment)
  } catch (error) {
    res.json({ message: "Something went wrong" })
  }
}
