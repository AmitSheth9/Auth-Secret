/* eslint-disable no-console */
const { Router } = require('express');
const Secret = require('../models/Secret');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try{
      const userId = Number(req.user.id);
      const { title, description } = req.body;
      const secret = await Secret.createSecret(userId, title, description);
      res.send(secret);
    }catch(error){
      next(error);
    }
  })
  .get('/', authenticate, async (req, res, next) => {
    try{
      const secrets = await Secret.getAllSecrets();
      res.send(secrets);
    } catch(error){
      next(error);
    }
  });
