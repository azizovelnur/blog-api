import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const createPost = async (req, res) => {
  try {
    const newPost = await prisma.post.create({
      data: {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        userId: req.userId,
      },
    })
    res.json(newPost)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "create post error" })
  }
}

export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { user: true, comments: true },
      orderBy: { createdAt: "desc" },
    })
    res.json(posts)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "error get all posts" })
  }
}

export const getPopularPosts = async (req, res) => {
  try {
    const popularPosts = await prisma.post.findMany({
      include: { user: true, comments: true },
      take: 5,
      orderBy: { viewCount: "desc" },
    })
    res.json(popularPosts)
  } catch (error) {
    console.error(error)
    res.json({ message: "error popular posts" })
  }
}

export const getOnePost = async (req, res) => {
  try {
    const postId = parseInt(req.params.id)

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { viewCount: { increment: 1 } },
      include: { user: true, comments: true },
    })

    if (!updatedPost) {
      return res.status(404).json({ message: "post not found" })
    }

    res.json(updatedPost)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "error get one posts" })
  }
}

export const deletePost = async (req, res) => {
  try {
    const postId = parseInt(req.params.id)

    const deletedPost = await prisma.post.delete({
      where: { id: postId },
    })

    if (!deletedPost) {
      return res.status(404).json({ message: "post not found" })
    }

    res.json({ success: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "error delete post" })
  }
}

export const updatePost = async (req, res) => {
  try {
    const postId = parseInt(req.params.id)

    await prisma.post.update({
      where: { id: postId },
      data: {
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        userId: req.userId,
        text: req.body.text,
      },
    })

    res.json({ success: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "error update post" })
  }
}

export const getPostComments = async (req, res) => {
  try {
    const postId = parseInt(req.params.id)

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { comments: { include: { user: true } } },
    })

    if (!post) {
      return res.status(404).json({ message: "post not found" })
    }

    const comments = post.comments
    res.json(comments)
  } catch (error) {
    console.error(error)
    res.json({ message: "Something went wrong in postsController" })
  }
}
