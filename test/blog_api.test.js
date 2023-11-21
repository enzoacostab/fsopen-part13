const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'y',
    author: 'enzo',
    url: 'asdfjkda',
    likes: 45,
  },
  {
    title: 'x',
    author: 'enzo',
    url: 'asdas',
    likes: 23,
  },
]
const initialUser = {
  username: 'evf',
  name: 'enzo',
  password: '123'
}
beforeEach (async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  await api.post('/api/users').send(initialUser)
}, 10000)

test('json format and correct amount', async () => {
    const res=await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    expect(res.body).toHaveLength(2)
})

test('unique identifier id', async () => {
    const res=await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    expect(res.body[0]['id']).toBeDefined()
})

test('add blog', async () => {
    const aut={
        username: 'evf',
        password: '123'
    }
    const token = await api.post('/api/login').send(aut)
    const nb={
        title: 'y',
        author: 'enzo',
        url: 'kjkda',
        likes: 45,}
    await api.post('/api/blogs').set('Authorization', `Bearer ${token.body.token}`).send(nb).expect(201).expect('Content-Type', /application\/json/)
    const res=await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    expect(res.body).toHaveLength(initialBlogs.length+1)
})

test('add blog without likes', async () => {
    const aut={
        username: 'evf',
        password: '123'
    }
    const token=await api.post('/api/login').send(aut)
    const nb = {
        title: 'y',
        author: 'enzo',
        url: 'kjkda',
    }
    await api.post('/api/blogs').set('Authorization', `Bearer ${token.body.token}`).send(nb).expect(201).expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    expect(response.body[initialBlogs.length].likes).toBe(0)
})

test('add blog without title and url', async () => {
    const aut={
        username: 'evf',
        password: '123'
    }
    const token=await api.post('/api/login').send(aut)
    const nb = {
        author: 'enzo',
        likes: '123'
    }
    await api.post('/api/blogs').set('Authorization', `Bearer ${token.body.token}`).send(nb).expect(400)
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('add blog without token', async () => {
    const nb = {
        author: 'enzo',
        likes: '123'
    }
    await api.post('/api/blogs').send(nb).expect(401)
})

test('validation error creating user', async () => {
    const nu = {
        'username':'ev',
        'name':'enzo',
        'password':'1jk'
    }
    await api.post('/api/users').send(nu).expect(400).expect('Content-Type', /text\/html/)
})

afterAll(() => {
    mongoose.connection.close()
})
