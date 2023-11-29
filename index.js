import { sequelize, connectToDatabase } from './util/db.cjs'
import { QueryTypes } from 'sequelize'
import app from './app.js'

const main = async () => {
  try {
    await connectToDatabase()
    const blogs = await sequelize.query('SELECT * FROM blogs', { type: QueryTypes.SELECT })
    blogs.forEach(blog => console.log(`${blog.author}: "${blog.title}", ${blog.likes} likes`))
    app.listen(3000)
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()
