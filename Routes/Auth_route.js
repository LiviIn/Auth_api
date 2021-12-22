const express = require('express');
const router = express.Router();

const AuthComtroller = require('../Controllers/auth_controller')
const UserController = require('../Controllers/user')

const auth = require('../helpers/jwt_helper')

router.get('/user', auth, UserController.getUser);
router.get('/useres', auth, UserController.getAllUseres);

router.post('/register', AuthComtroller.register);

router.post('/login', AuthComtroller.login);

// router.post('/refresh-token', AuthComtroller.refreashToken);

// router.delete('/logout', AuthComtroller.delete);













module.exports = router