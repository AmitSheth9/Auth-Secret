/* eslint-disable no-console */
const { Router } = require('express');
const Secret = require('../models/Secret');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try{
      console.log('hit route');
      console.log(typeof req.user.id);
      const userId = Number(req.user.id);
      console.log(typeof userId);
      const { title, description } = req.body;
      const secret = await Secret.createSecret(userId, title, description);
      console.log('secret', secret);
      res.send(secret);
    }catch(error){
      next(error);
    }
  });
