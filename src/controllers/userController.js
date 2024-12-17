const UserRepository = require("../repositories/userRepository")
const UserService = require("../services/userService")

 async function createUser(req, res){
    const userService = new UserService(new UserRepository());
    try {
        const response = await userService.registerUser(req.body)
        return res.status(201).json({
            message: "successfully registered the user",
            success: true,
            data: response,
            erorr: {}
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.reason,
            data: {},
            error: error
        })
    }
}

module.exports = {
    createUser
}