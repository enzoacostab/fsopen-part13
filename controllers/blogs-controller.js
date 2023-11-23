import { Blog } from '../models/Blog.js'

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll()
    res.json(blogs)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const createBlog = async (req, res) => {
  const { title, author, url, likes } = req.body

  try {
    const newBlog = await Blog.create({
      title,
      author,
      url,
      likes
    })
    await newBlog.save()
    res.json(newBlog)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const deleteBlog = async (req, res) => {
  const { id } = req.params

  try {
    await Blog.destroy({
      where: {
        id
      }
    })
    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
