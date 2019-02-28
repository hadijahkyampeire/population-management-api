const asyncHandler = require('express-async-handler');
const LocationController = require('../controllers/locations');
const Router = require('./base');

Router.post('/locations', asyncHandler(LocationController.store));
Router.get('/locations', asyncHandler(LocationController.index));
Router.get('/locations/:id', asyncHandler(LocationController.show));
Router.put('/locations/:id', asyncHandler(LocationController.update));
Router.delete('/locations/:id', asyncHandler(LocationController.destroy));
