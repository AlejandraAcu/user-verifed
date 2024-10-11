const { getAll, create, getOne, remove, update, login, logged, userVerified, resetPassword, updatePassword } = require('../controllers/user.controllers');
const express = require('express');
const hashPassword = require('../middlewares/hashPassword.middlewares');
const loginMiddlewares = require('../middlewares/login.middleware');
const sessionJWT = require('../middlewares/sessionJWT.middlewares');
const emailCode = require('../middlewares/emailCode.middlewares');
const { verifyJWT } = require('../utils/verifyJWT');


const routerUser = express.Router();

routerUser.route('/')
    .get(verifyJWT,getAll)
    .post(hashPassword,create, emailCode);

routerUser.route('/login')
    .post(loginMiddlewares, sessionJWT, login)

routerUser.route('/me')
    .get(verifyJWT, logged)

routerUser.route('/reset_password')
    .post(resetPassword)

routerUser.route('/verify/:code')
    .get(userVerified)

routerUser.route('/reset_password/:code')
    .post(updatePassword)

routerUser.route('/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = routerUser;