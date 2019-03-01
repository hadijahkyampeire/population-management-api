require('dotenv').config();

const supertest = require('supertest');
const connection = require('./models/db');
const app = require('./app');

beforeEach(done => {
  connection.dropDatabase(done);
  
});


global.agent = supertest.agent(app).set({ Accept: 'application/json' });
