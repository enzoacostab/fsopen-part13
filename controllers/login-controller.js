import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({
    where: {
      username
    }
  })

  const passwordCorrect = user
    ? await bcrypt.compare(password, user?.passwordHash)
    : false

  if (!user || !passwordCorrect) {
    return res.status(401).json({
      error: 'The username or password is incorrect'
    })
  }

  const userForToken = {
    username,
    id: user.id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)
  res.json({ token, username, id: user.id })
}
