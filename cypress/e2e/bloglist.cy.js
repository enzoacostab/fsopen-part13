/* eslint-disable no-undef */
describe('Blog app', function() {
  
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'evf',
      name: 'enzo',
      password: '123'
    })
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'fve',
      name: 'enzo',
      password: '123'
    })
    cy.visit('http://localhost:3003')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  it('successful login', function(){
    cy.get('#username').type('evf')
    cy.get('#password').type('123')
    cy.get('#login').click()
    cy.contains('logout')
  })

  it('login failed', function(){
    cy.get('#username').type('evf')
    cy.get('#password').type('1234')
    cy.get('#login').click()
    cy.contains('wrong username or password')
    cy.get('#msg').should('have.css', 'color' , 'rgb(255, 0, 0)')
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({username:'evf', password:'123'})
    })
    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({title:'.', author:'evf', url:'url' , likes:1})
      })
      it('like blog', function(){
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('liked')
      })
      it('remove blog', function(){
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.contains('removed')
      })
      it('another user cannot delete the blog', function(){
        cy.contains('logout').click()
        cy.login({username:'fve', password:'123'})
        cy.contains('view').click()
        cy.contains('remove').should('not.exist')
      })
      it('blogs sorted by likes', function(){
        cy.createBlog({title:'..', author:'evf', url:'url' , likes:2})
        cy.createBlog({title:'...', author:'evf', url:'url' , likes:3})
        cy.get('.swv').eq(0).contains(3)        
        cy.get('.swv').eq(1).contains(2)               
      })
    })
  })
})