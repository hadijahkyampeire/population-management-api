const asyncHandler = require('express-async-handler');
const UsersController = require('../controllers/users');
const Router = require('./base');

Router.post('/signup', asyncHandler(UsersController.signup));
Router.post('/login', asyncHandler(UsersController.login));
