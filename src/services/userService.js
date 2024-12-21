const { createUser, findUser } = require("../repositories/userRepository");

    async function registerUser(userDetails) {
        console.log("Hitting service layer")
        //it will create a brand new user in the db

        //1. We need to check if the user with with this email and mobile no already exists or not
        const user = await findUser({
            email: userDetails.email,
            mobileNumber: userDetails.mobileNumber
        });

        if(user){
            //we found a user
            throw {reason: "User with the given email and mobile no already exists", statusCode: 400}
        }
        //2. If not then cereate the user in the db 
        const newUser = await createUser({
            email: userDetails.email,
            password: userDetails.password,
            firsName: userDetails.firsName,
            lastName: userDetails.lastName,
            mobileNumber: userDetails.mobileNumber
        });

        if(!newUser){
            throw {reason: "something went wrong can't create user", statusCode: 500}
        }
        //3. return the details of created users
        return newUser;
    }

module.exports = {
    registerUser
}