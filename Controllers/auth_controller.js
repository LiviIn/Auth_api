const createError = require('http-errors');

const User = require('../Models/User_model');
const { authSchema } = require('../helpers/validation_schema');
// const client = require('../helpers/init_redis');

module.exports = {
    register: async(req, res, next) =>{
        try {
            const result = await req.body
            console.log("result : " + result)
            const doesExist = await User.findOne({ email: result.email });
            if (doesExist){
                throw createError.Conflict(`${result.email} is alredy been registered`)
            }
    
            const user = new User( result );
            console.log(user)
            const saveUser = await user.save();
            res.send({ saveUser });
    
        } catch (error) {
            if( error.isJoi === true ) error.status = 422
            next(error)
        }

    },
    
    login: async(req, res, next) =>{
        try {
             const result = await authSchema.validateAsync(req.body)
             const user = await User.findOne({ email: result.email })
             console.log('result' + user)
             if(!user){
                 throw createError.NotFound("User Not registered")
             }
             const isMatch = await user.isValidPassword(result.password)
             if(!isMatch) {
                 throw createError.Unauthorized('Username/password not valid')
             }else{
                console.log(user)
                res.send({"token":  user.generateJwt()})
             }
        } catch (error) {
         if( error.isJoi === true ) {
             return next(createError.BadRequest('Invalid Username/Password'))
         }
         next(error) 
        }
     },

}