const express = require('express');
const { createUser } = require('../controllers/userController');

//We have to initialize the router object to add routes in a new file
//Routers are used for segregating your routes in different modules

const userRouter = express.Router();

userRouter.post('/', createUser) // This is a route registration

module.exports = userRouter; //Exporting the router 