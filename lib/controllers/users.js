/* eslint-disable no-console */
const { Router } = require('express');
const UserService = require('../services/UserService');
const authenticate = require('../middleware/authenticate');

const ONE_DAY = 1000 * 60 * 60 * 24;
module.exports = Router() 
  .post('/', async (req, res, next) => {
    try{
      const user = await UserService.create(req.body);
      res.send(user);
    }catch (error) {
      next(error);
    }
  })
  .post('/sessions', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const sessionToken = await UserService.signIn({ email, password });
      console.log(sessionToken);
      res
        .cookie(process.env.COOKIE_NAME, sessionToken, {
          httpOnly: true,
          maxAge: ONE_DAY,
        })
        .send({ message: 'Sign in Succesful!' });
    } catch(error) {
      next(error);
    }
  })
  .get('/me', authenticate, (req, res) => {
    res.send(req.user);
  })
  .delete('/sessions', (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME)
      .json({ success: true, message: 'Signed Out' });
  });

