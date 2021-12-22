var jwt = require('jsonwebtoken');

const User = require('../Models/User_model');
var secret = process.env.TOKEN_SECRET

exports.getAllUseres = async (req, res, next) =>{
    const users = await User.find();
    console.log(users)
    //SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: users.length,
        data:{
            users
        }
    })
}
exports.getUser = (req, res, next) => {
    var token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, secret);
        console.log(decoded._id)
        User.findById(decoded._id).then(userData =>{
            console.log("getUser Data :"+userData)
           res.status(200).json({
               message: "Profile featched sucessfully..!",
               user: userData,
           }) 
        }).catch((error) => {
            console.log(error)
            res.status(400).json('error');
        })
  
    
    // const user = User.find();
    // console.log(user.email)
    // jwt.verify(req.headers.authorization, secret, function (err, decoded) {
    
    // })
}
