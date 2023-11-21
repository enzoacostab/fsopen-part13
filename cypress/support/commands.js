Cypress.Commands.add('login', ({ username, password }) => {
  cy.request({
    method: 'POST', 
    url: 'http://localhost:3003/api/login', 
    body: { username, password }
  })
  .then(({ body }) => {
    localStorage.setItem('loggedUser', JSON.stringify(body))
    cy.visit('http://localhost:3003')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { title, author, url, likes },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
    }
  }).then(() => {
    cy.visit('http://localhost:3003')
  })
})