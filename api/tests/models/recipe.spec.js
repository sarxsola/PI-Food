const { Recipe, conn, Diet } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('title and summary', () => {
      it('should throw an error if title and summary is null', (done) => {
        Recipe.create({
          title: null,
          summary: null
        })
          .then(() => done(new Error('It requires a valid title and summary')))
          .catch(() => done());
      });

      it('should throw an error if title or summary is null', (done) => {
        Recipe.create({
          title: 'Milanesa de carne',
          summary: null
        })
          .then(() => done(new Error('It requires a both title and summary')))
          .catch(() => done());
      });

      afterEach(() => Recipe.sync({force: true}));
      
    });

    describe('creating recipe', () => {
      it('should create when both values are given', () => {
        Recipe.create({
          title: 'Sopa do macaco',
          summary: 'E uma delisia'
        })
        .then(() => done());
      })

      it('should return the created recipe', async () => {
        let temp = await Recipe.create({
                            title: 'Sopa do macaco',
                            summary: 'E uma delisia'
                          })

                          expect(temp.title).to.equal('Sopa do macaco')
                          expect(temp.summary).to.equal('E uma delisia')

      })
    })
  });
});
