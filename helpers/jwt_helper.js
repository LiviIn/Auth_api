const { promisify } = require('util')
const JWT = require('jsonwebtoken')


const createError = require('http-errors')
const client = require('./init_redis')

module.exports = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ){
      // Getting token and check of it's there
      token = req.headers.authorization.split(' ')[1];
    }
    
    // Verification token
    const decoded = await JWT.verify(token,  process.env.TOKEN_SECRET);
    console.log(decoded);

    next();
  } catch(error){
    return res.status(401).json({
      message: error.message
    })
  }  
  
}