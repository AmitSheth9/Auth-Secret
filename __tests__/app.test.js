/* eslint-disable no-console */
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const mockUser = {
  email: 'mock',
  password: 'pass',
};

const registerAndLogin = async (userProps = {}) => {
  const agent = request.agent(app);
  const password = userProps.password ?? mockUser.password;


  const user = await UserService.create({ ...mockUser, ...userProps });
  
  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });


  return [agent, user];
};



describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    const { email } = mockUser;

    expect(res.body).toEqual({
      id: expect.any(String),
      email
    });
  });
  it('logs user in', async() => {
    const [agent, user] = await registerAndLogin();
    const res = await agent.post('/api/v1/users/sessions').send(mockUser);

    expect(res.body).toEqual({
      message: 'Sign in Succesful!'
    });
  });
  it('it logs user out', async() => {
    const [agent, user] = await registerAndLogin();
    const res = await agent.delete('/api/v1/users/sessions');

    expect(res.body).toEqual({ 
      success: true,
      message: 'Signed Out',
    });
  });
});
