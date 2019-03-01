const jwt = require('jsonwebtoken');

const location = {
  location_name: 'Kanungu',
  females: 200,
  males: 300
};

const user = {
  email: 'hard@gmail.com',
  username: 'jarh',
  password: 'secret'
};
const mockToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoiaGFkaWphaEBnbWFpbC5jb20iLCJ1c2VyX2lkIjoiNWM3OTFkOTc3YzVhNzAwMDE3N2IwYTQyIn0sImlhdCI6MTU1MTQ0MjI1MCwiZXhwIjoxNTUxNTI4NjUwfQ.luSQeskvCbuICe9scaRsXW3iKOD-TEMWIefowh9KncI';
// const loginUser = () => {
//   return createUser().then(() => {
//     return agent
//       .post('/api/v1/login')
//       .send(user)
//       .set('Content-Type', 'application/json')
//       .then((response) => {
//         const payload = { email: 'hard@gmail.com', user_id: '5c77dcdbf7e86d33c977a877' };
//         token = jwt.sign({ payload }, process.env.SECRET, { expiresIn: 86400 });
//         console.log({ token }, response.body);
//         return response.body
//       })
//   });
// };

// const createUser = () => {
//   return agent
//     .post('/api/v1/signup')
//     .send(user)
//     .set('Content-Type', 'application/json');
// };

// beforeAll(async function() {
//   // set up here
//   token = await loginUser();
// });

describe('Locations', () => {
  test('post /location returns 201 for authorized user', done => {
    agent
      .post('/api/v1/locations')
      .send(location)
      .set('authorization', mockToken)
      .expect(201)
      .end();
    done();
  });

  test('post /location returns 400 with wrong data for authorized user', done => {
    agent
      .post('/api/v1/locations')
      .send({ location_name: 'blbla' })
      .set('authorization', mockToken)
      .expect(400)
      .end();
    done();
  });

  test('get /location returns 200 for authorized user', done => {
    agent
      .get('/api/v1/locations')
      .set('authorization', mockToken)
      .expect(200)
      .end();
    done();
  });

  test('delete /location returns 200 for authorized user', done => {
    agent
      .delete('/api/v1/locations/5c782cd9cfa9bf5e67dfece2')
      .set('authorization', mockToken)
      .expect(200)
      .end();
    done();
  });

  test('post /location returns 403 for unauthorized user', done => {
    agent
      .post('/api/v1/locations')
      .send(location)
      .expect(403)
      .end(done);
  });
});
