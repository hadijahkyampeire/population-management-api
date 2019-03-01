const Location = require('../models/location');
const connection = require('../models/db');

const location = {
  location_name: 'Kanungu',
  females: 200,
  males: 300
};

const user = {
  email: 'hardier@gmail.com',
  username: 'jarhds',
  password: 'secrets'
};

const loginUser = () => {
  return createUser().then(() => {
    return agent
      .post('/api/v1/login')
      .send(user)
      .set('Content-Type', 'application/json')
      .then(response => {
        return response.body.access_token;
      });
  });
};

const createUser = () => {
  return agent
    .post('/api/v1/signup')
    .send(user)
    .set('Content-Type', 'application/json');
};

const createLocation = () => {
  const alocation = Location.create(location);
  return alocation;

};

beforeEach(async function() {
  // set up token here

  token = await loginUser();
});

afterEach((done) => {
  connection.dropDatabase(done);
});

describe('Locations', () => {
  test('post /location returns 422 with wrong data for authorized user', done => {
    agent
      .post('/api/v1/locations')
      .send({ location_name: 'blbla' })
      .set('authorization', token)
      .expect(422)
      .end(done);
  });

  test('get /location returns 200 for authorized user', done => {
    agent
      .get('/api/v1/locations')
      .set('authorization', token)
      .expect(200)
      .end(done);
  });

  test('post /location returns 403 for unauthorized user', done => {
    agent
      .post('/api/v1/locations')
      .send(location)
      .expect(403)
      .end(done);
  });

  test('get /location returns 200 for authorized user', async () => {
    const result = await createLocation();
    const { _id } = result;
    return agent
      .get(`/api/v1/locations/${_id}`)
      .set('authorization', token)
      .expect(200);
  });

  test('delete /location returns 200 for authorized user', async () => {
    const result = await createLocation();
    const { _id } = result;
    return agent
      .delete(`/api/v1/locations/${_id}`)
      .set('authorization', token)
      .expect(200);
  });

});
