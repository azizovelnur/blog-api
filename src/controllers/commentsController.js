import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const createComment = async (req, res) => {
  try {
    const { postId, comment } = req.body

    if (!comment) return res.json({ message: "The comment cannot be empty" })

    const newComment = await prisma.comment.create({
      data: {
        comment,
        userId: req.userId,
        postId: parseInt(postId),
      },
    })

    await prisma.post.update({
      where: { id: parseInt(postId) },
      data: { comments: { connect: { id: newComment.id } } },
    })

    res.json(newComment)
  } catch (error) {
    console.error(error)
    res.json({ message: "Something went wrong" })
  }
}

export const deleteComment = async (req, res) => {
  try {
    const updatedPost = await prisma.post.update({
      where: { id: parseInt(req.params.postId) },
      data: {
        comments: { disconnect: { id: parseInt(req.params.commentId) } },
      },
    })

    if (!updatedPost) {
      return res.status(400).send("Post not found")
    }

    await prisma.comment.delete({
      where: { id: parseInt(req.params.commentId) },
    })

    res.json({ message: "Success" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Something went wrong" })
  }
}
