/* eslint-disable no-console */
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const cookie = req.cookies.session;
    console.log('cookie', cookie);
    const payload = jwt.verify(cookie, process.env.JWT_SECRET);
    req.user = payload;
    console.log('cookie', cookie);
    next();
  }catch(error){
    console.log(error);
    error.message = 'You must be signed in';
    error.status = 401;
    next(error);
  }
};
