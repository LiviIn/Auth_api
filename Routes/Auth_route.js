const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const User = require('../Models/User_model');
const { authSchema } = require('../helpers/validation_schema');
const { signAccessToken, signRefreashToken, verifyRefreshToken } = require('../helpers/jwt_helper')

router.post('/register', async(req, res, next) =>{
    // console.log(req.body)
    try {

        // const { email, password } = req.body
        // if (!email || !password) {
        //     throw createError.BadRequest()
        // }
        const result = await authSchema.validateAsync(req.body)
        
        const doesExist = await User.findOne({ email: result.email });
        if (doesExist){
            throw createError.Conflict(`${result.email} is alredy been registered`)
        }

        const user = new User( result );
        console.log(user)
        const saveUser = await user.save();
        const accessToken = await signAccessToken(saveUser.id)
        const refreshToken = await signRefreashToken(saveUser.id)
        res.send({ accessToken, refreshToken });

    } catch (error) {
        if( error.isJoi === true ) error.status = 422
        next(error)
    }
});

router.post('/login', async(req, res, next) =>{
   try {
        const result = await authSchema.validateAsync(req.body)
        const user = await User.findOne({ email: result.email })

        if(!user){
            throw createError.NotFound("User Not registered")
        }

        const isMatch = await user.isValidPassword(result.password)
        if(!isMatch) {
            throw createError.Unauthorized('Username/password not valid')
        }

        const accessToken = await signAccessToken(user.id)
        const refreashToken = await signRefreashToken(user.id)

       res.send({ accessToken, refreashToken })
   } catch (error) {
    if( error.isJoi === true ) {
        return next(createError.BadRequest('Invalid Username/Password'))
    }
    next(error) 
   }
});

router.post('/refresh-token', async(req, res, next) =>{
    try {
        const { refreashToken } = req.body
        if( !refreashToken ) throw createError.BadRequest()
        const userId = await verifyRefreshToken( refreashToken )

        const accessToken = await signAccessToken(userId)
        const refToken = await signRefreashToken(userId)

        res.send({ accessToken: accessToken, refreashToken: refToken  })
    } catch (error) {
        next(error)
    }
});

router.delete('/logout', async(req, res, next) =>{
    res.send("logout route")
});













module.exports = router