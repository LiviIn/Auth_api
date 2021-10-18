const express = require('express');
const router = express.Router();

const AuthComtroller = require('../Controllers/auth_controller')

router.post('/register', AuthComtroller.register);

router.post('/login', AuthComtroller.login);

router.post('/refresh-token', AuthComtroller.refreashToken);

router.delete('/logout', AuthComtroller.delete);













module.exports = router