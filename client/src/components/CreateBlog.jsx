import React, { useState } from 'react'
import propTypes from 'prop-types'

const CreateBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)

  const addBlog = () => {
    const data = { title, author, url, likes }
    createBlog(data)
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes(0)
  }
  return <div>
    <h2>create blog</h2>
    <form onSubmit = { addBlog }>
      <input id='title' type='text' placeholder='title' value={title} onChange={({ target }) => setTitle(target.value)}/><br/>
      <input id='author' type='text' placeholder='author' value={author} onChange={({ target }) => setAuthor(target.value)}/><br/>
      <input id='url' type='text' placeholder='url' value={url} onChange={({ target }) => setUrl(target.value)}/><br/>
      <input id='likes' type='number' placeholder='likes' value={likes} onChange={({ target }) => setLikes(target.value)}/><br/>
      <input id='create' value='create' type='submit'/>
    </form>
  </div>
}

CreateBlog.propTypes = {
  createBlog: propTypes.func.isRequired
}

export default CreateBlog
