/// <reference types="cypress" />
import { faker } from '@faker-js/faker'

describe('Testes da Funcionalidade Usuários', () => {
  it('Deve validar contrato de usuários', () => {
    //TODO:
  })

  it('Deve listar usuários cadastrados', () => {
    //TODO:
    cy.request({ url: 'usuarios' })
  })

  it('Deve cadastrar um usuário com sucesso', () => {
    //TODO:
    cy.request({
      method: 'POST',
      url: 'usuarios',
      body: {
        nome: faker.internet.userName(),
        email: faker.internet.email(),
        password: 'teste1',
        administrador: 'false'
      }
    }).then(response => {
      expect(response.status).to.equal(201)
      expect(response.body.message).to.equal('Cadastro realizado com sucesso')
    })
  })

  it('Deve validar um usuário com email inválido', () => {
    cy.request({
      method: 'POST',
      url: 'usuarios',
      body: {
        nome: faker.internet.userName(),
        email: faker.internet.userName(),
        password: 'teste1',
        administrador: 'false'
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(400)
      expect(response.body.email).to.equal('email deve ser um email válido')
    })
  })

  it('Deve editar um usuário previamente cadastrado', () => {
    cy.request({ url: 'usuarios' })
      .then(response => {
        let id = response.body.usuarios[1]._id

        cy.request({
          method: 'PUT',
          url: `usuarios/${id}`,
          body: {
            nome: faker.internet.userName(),
            email: faker.internet.email(),
            password: 'teste',
            administrador: 'true'
          }
        })
      })
      .then(response => {
        expect(response.body.message).to.equal('Registro alterado com sucesso')
        expect(response.status).to.equal(200)
      })
  })

  it('Deve deletar um usuário previamente cadastrado', () => {
    cy.request({ url: 'usuarios' })
      .then(response => {
        let id = response.body.usuarios[1]._id

        cy.request({
          method: 'DELETE',
          url: `usuarios/${id}`,
          failOnStatusCode: false
        })
      })
      .then(response => {
        expect(response.body.message).to.equal('Registro excluído com sucesso')
        expect(response.status).to.equal(200)
      })
  })
})
