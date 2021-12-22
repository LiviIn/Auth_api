const express = require('express');

const router = express.Router();

router.get('/', function(req, res){
    res.send(
        "<h1>Welcome to My app.Please Be patient as we are still building.</h1>"
        )
    
});

module.exports = router