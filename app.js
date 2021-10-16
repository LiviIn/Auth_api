const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config();
require('./helpers/init_mongodb');

const AuthRoute = require('./Routes/Auth_route');
const { verifyAccessToken } = require('./helpers/jwt_helper')

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.get('/',verifyAccessToken, async(req, res, next) => {
    console.log(req.headers['authorization'])
    res.send('Hello from express.')
})


app.use('/auth', AuthRoute)
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