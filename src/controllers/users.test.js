const user = {
  email: 'hard@gmail.com',
  username: 'jarh',
  password: 'secret'
};

describe('Users', () => {
  test('post /signup returns 201 with valid data', done => {
    agent
      .post('/api/v1/signup')
      .send(user)
      .expect(201)
      .end(done);
  });

  test('post /signup returns 422 with invalid data', done => {
    agent
      .post('/api/v1/signup')
      .send({})
      .expect(422)
      .end(done);
  });

  test('post api/v1/login throws a 401 exception for wrong email and password', done => {
    agent
      .post('/api/v1/login')
      .send({ email: 'xyz@gmail.com', password: 'wrong password' })
      .expect(401)
      .end(done);
  });
});
