// const passport = require("passport");
// const localStrategy = require('passport-local').Strategy;

// var User = require('../Models/User_model');

// passport.use(
//     new localStrategy({ usernameField: "email"}, (username, password, done ) =>{
//         User.findOne({ email: username },
//             (err, user) => {
//                 if(err){
//                     return done(err)
//                 } else if (!user){
//                     //unknown user
//                     return done (null, false, { message: 'Email is not registered '});
//                 } else if(!user.veryfyPassword(password)){
//                     //wrong password
//                     return done(null, false, { message: 'Wrong Password.'})
//                 } else {
//                     //authentication
//                     return done(null, user, {message: 'Login sucess'})
//                 }
//             })
//     })
// )