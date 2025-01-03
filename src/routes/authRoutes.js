const express = require('express');
const { login, logout } = require('../controllers/authController');

//We have to initialize the router object to add routes in a new file
//Routers are used for segregating your routes in different modules

const authRoute = express.Router();

authRoute.post('/login', login) // This is a route registration
authRoute.post('/logout', logout) 

module.exports = authRoute; //Exporting the router 