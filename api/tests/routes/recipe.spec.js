/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = supertest(app);

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create({
      title: 'Milanesa',
      summary: 'Son re ricas con mucho limon'
    })));
  
    
  afterEach(() => Recipe.sync({ force: true }));


  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );

    it('should search by name', () => {
      agent.get('/recipes?name=Milanesa')
      .then(recipes => {
        expect(recipes.body[0].title).to.equal('Milanesa')
      })
    })

    it("should return error if query doesn't exist", () => {
      agent.get('/recipes?name=SopaDoMacaco')
      .then(() => 
        done(new Error("The searched query doesn't exist")))
        .catch(() => done());
    })
  });
});
