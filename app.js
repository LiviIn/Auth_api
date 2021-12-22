const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const createError = require('http-errors');
// const passport = require("passport");
const path = require('path')

const auth = require('./helpers/jwt_helper');

require('dotenv').config();
require('./helpers/init_mongodb');
// require('./helpers/init_redis');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use("/uploads", express.static( path.join( __dirname, 'uploads'))); //Serving static files

app.use(cors());

// app.use(passport.initialize());

app.get('/', auth, async(req, res, next) => {
    // console.log(req.headers['authorization'])
    res.send('Hello from express.')
})

//file path
var home = require('./home')
const AuthRoute = require('./Routes/Auth_route');
const ProductRoute = require('./Routes/Product_route')


// URL path
app.use('/', home);
app.use('/auth', AuthRoute);
app.use('/products', ProductRoute);


//Error handler
app.use( async (req, res, next) => {
    // const error = new Error("NOT FOUND");
    // error.status = 404;
    // next(error);
    // next(createError.NotFound('That route does not exist'));
    next(createError.NotFound());
});

app.use((err, req, res, next) =>{
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

const PORT = process.env.PORT || 3010

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})