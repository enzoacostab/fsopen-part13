import Blog from '../models/Blog.js'
import User from '../models/User.js'

export const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({
      attributes: { exclude: ['userId'] },
      include: {
        model: User,
        attributes: ['name']
      }
    })
    res.json(blogs)
  } catch (error) {
    next(error)
  }
}

export const createBlog = async (req, res, next) => {
  const { title, author, url, likes } = req.body

  try {
    const user = req.user
    const newBlog = await Blog.create({
      userId: user.id,
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
  const { userId } = await Blog.findByPk(id)

  if (req.user.id !== userId) {
    return res.status(401).json({ error: 'authorization error' })
  }

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
