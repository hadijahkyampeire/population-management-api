require('dotenv').config();
const jwt = require('jsonwebtoken');
jest.mock('jsonwebtoken');

const supertest = require('supertest');
const connection = require('./models/db');
const app = require('./app');

beforeEach(done => {
  jwt.verify.mockImplementation((token) => {token} );
  jwt.decode.mockImplementation((user) => {user});
  connection.dropDatabase(done);
  
});

afterEach(() => {
  //clear the logged in user after every test
  jwt.decode.mockRestore();
});

global.authenticate = user => {
  jwt.decode.mockImplementation(() => user);
};

global.agent = supertest.agent(app).set({ Accept: 'application/json' });
