const mongoose = require('mongoose');
const schema = mongoose.Schema
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET;
const expires = process.env.TOKEN_EXPIRES_IN

const UserSchema = new schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    countrycode: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },

    passwordChangedAt: Date
})

UserSchema.pre('save', async function(next){
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword,
        next();
    } catch (error) {
        next(error)
    }
});

UserSchema.methods.isValidPassword = async function (password){
    try {
      return await bcrypt.compare(password, this.password)  
    } catch (error) {
      throw error  
    }
}

//password Chaged after the token created
UserSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        console(this.passwordChangedAt, JWTTimestamp)
    }
    return false
}

UserSchema.methods.generateJwt = function(){
    return jwt.sign({_id: this._id }, secret, { expiresIn: expires });
}


const User = mongoose.model('user', UserSchema);
module.exports = User