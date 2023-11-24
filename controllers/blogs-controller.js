import { Blog } from '../models/Blog.js'

export const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.findAll()
    res.json(blogs)
  } catch (error) {
    next(error)
  }
}

export const createBlog = async (req, res, next) => {
  const { title, author, url, likes } = req.body

  try {
    const newBlog = await Blog.create({
      title,
      author,
      url,
      likes
    })
    res.json(newBlog)
  } catch (error) {
    next(error)
  }
}

export const deleteBlog = async (req, res, next) => {
  const { id } = req.params

  try {
    await Blog.destroy({
      where: {
        id
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}

export const updateBlog = async (req, res, next) => {
  const { id } = req.params
  const { likes } = req.body

  try {
    const blog = await Blog.findByPk(id)
    blog.likes = likes
    blog.save()
    res.json(blog)
  } catch (error) {
    next(error)
  }
}
