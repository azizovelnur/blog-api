import CommentsModel from "../models/CommentsModel.js"
import PostModel from "../models/PostModel.js"

export const createComment = async (req, res) => {
  try {
    const { postId, comment } = req.body

    if (!comment) return res.json({ message: "The comment cannot be empty" })

    const newComment = new CommentsModel({ comment, user: req.userId })
    await newComment.save()

    try {
      await PostModel.findByIdAndUpdate(postId, {
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

export const deleteComment = async (req, res) => {
  try {
    const post = await PostModel.findByIdAndUpdate(
      req.params.postId,
      {
        $pull: { comments: req.params.commentId },
      },
      { new: true }
    )

    if (!post) {
      return res.status(400).send("Post not found")
    }

    await CommentsModel.findByIdAndDelete(req.params.commentId)

    res.json({ message: "Success" })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Something went wrong" })
  }
}
