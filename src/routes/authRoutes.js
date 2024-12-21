const express = require('express');
const { login } = require('../controllers/authController');

//We have to initialize the router object to add routes in a new file
//Routers are used for segregating your routes in different modules

const authRoute = express.Router();

authRoute.post('/login', login) // This is a route registration

module.exports = authRoute; //Exporting the router 