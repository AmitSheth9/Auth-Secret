const { Router } = require('express');
const UserService = require('../services/UserService');

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

      res.cookie(process.env.COOKIE_NAME, sessionToken, {
        httpOnly: true,
        maxAge: ONE_DAY,
      });
      res.json({ message: 'Sign in Succesful!' });
    } catch(error) {
      next(error);
    }
  })
  .get('/me', async(req, res, next) => {
    res.send(req.user);
  });

