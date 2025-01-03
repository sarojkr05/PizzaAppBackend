const AppError = require("./appError");

class UnauthorisedError extends AppError {
    constructor(){
        super(`User is not authorised properly`, 401);
    }
}

module.exports = UnauthorisedError;