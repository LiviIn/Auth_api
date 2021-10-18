const createError = require('http-errors');

const User = require('../Models/User_model');
const { authSchema } = require('../helpers/validation_schema');
const { signAccessToken, signRefreashToken, verifyRefreshToken } = require('../helpers/jwt_helper')
const client = require('../helpers/init_redis')


module.exports = {
    register: async(req, res, next) =>{
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

    },

    login: async(req, res, next) =>{
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
     },

     refreashToken: async(req, res, next) =>{
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
    },

    delete: async(req, res, next) =>{
        try {
            const { refreshToken } = req.body
            if (!refreshToken){
                throw createError.BadRequest()
            }
            const userId = await verifyRefreshToken(refreshToken)
            client.DEL(userId, (err, val) =>{
                if (err){
                    console.log(err.message)
                    throw createError.InternalServerError()
                }
                console.log(val)
                res.sendStatus(204)
            })
        } catch (error) {
            next(error)
        }
    }
}