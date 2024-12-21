const { findUser } = require("../repositories/userRepository");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET, JWT_EXPIRY } = require("../config/serverConfig");

async function loginUser(authDetails) {
    const email = authDetails.email;
    const plainPassword = authDetails.password;

    //1. Check if there's a registered user with the given email
    const user = await findUser({ email });

    if(!user){
        throw {message: "No user found with given email", statusCode: 404}
    }

    //2. If the user is found, we need to compare plainIncommingPassword with hashedPassword
    const isPasswordValidated = await bcrypt.compare(plainPassword, user.password);

    if(!isPasswordValidated) {
        throw {message: "Invalid password please try again later", statusCode: 401}
    }

    //3. If the password is validated, create a token and return it
    const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRY
    });

    return token;
};

module.exports = {
    loginUser
};