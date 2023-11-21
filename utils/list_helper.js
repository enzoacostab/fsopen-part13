const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  blogs.forEach(b => {
    sum += b.likes
  })
  return sum
}
const favoriteBlog = (blogs) => {
  let m = 0
  m = blogs.sort((a, b) => b.likes - a.likes)
  return m[0]
}
const mostBlogs = (blogs) => {
  const obj = {}
  for (const i in blogs) {
    obj[blogs[i].author] ? obj[blogs[i].author].blogs += 1 : obj[blogs[i].author] = { author: blogs[i].author, blogs: 1 }
  }
  let m = { author: '', blogs: 0 }
  for (const j in obj) {
    obj[j].blogs > m.blogs && (m = { author: obj[j].author, blogs: obj[j].blogs })
  }
  return m
}
const mostLikes = (blogs) => {
  const obj = {}
  for (const i in blogs) {
    obj[blogs[i].author] ? obj[blogs[i].author].likes += blogs[i].likes : obj[blogs[i].author] = { author: blogs[i].author, likes: blogs[i].likes }
  }
  let m = { author: '', likes: 0 }
  for (const j in obj) {
    obj[j].likes > m.likes && (m = { author: obj[j].author, likes: obj[j].likes })
  }
  return m
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
