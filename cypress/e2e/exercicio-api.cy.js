import { faker } from '@faker-js/faker'
faker.locale = 'pt_BR'

import contratoUser from '../contracts/usuario.contract'

describe('Testes da Funcionalidade Usuários', () => {
  it.only('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response => {
      return (
        contratoUser.validateAsync(response.body),
        expect(response.status).to.equal(200)
      )
    })
  })

  it('Deve listar usuários cadastrados', () => {
    cy.request({ url: 'usuarios' }).then(response => {
      expect(response.status).to.equal(200)
    })
  })

  it('Deve cadastrar um usuário com sucesso', () => {
    cy.CadastroUsuario(
      faker.internet.userName(),
      faker.internet.email(),
      'teste123',
      'false'
    ).then(response => {
      expect(response.status).to.equal(201)
      expect(response.body.message).to.equal('Cadastro realizado com sucesso')
    })
  })

  it('Deve validar um usuário com email inválido', () => {
    cy.CadastroUsuario(
      faker.internet.userName(),
      faker.internet.userName(),
      'teste123',
      'false'
    ).then(response => {
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
