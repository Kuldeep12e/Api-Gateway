const {StatusCodes} = require('http-status-codes');
const  AppError = require('../utils/errors/app-error');
const userService = require('../services/user-service');

const {SuccessResponse  , ErrorResponse} = require('../utils/common');


function validateAuthRequest(req, res, next) {
    if(!req.body.email){
        ErrorResponse.message = "Email not found in the request";
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }else if(!req.body.password){
        ErrorResponse.message = "Password not found in the request";
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }else{
        next();
    }
}


async function checkAuth(req, res, next) {
    if(!req.headers.authorization){
        ErrorResponse.message = "Authorization token not found in the request";
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }else{
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            ErrorResponse.message = "Token not found";
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }else{
            try{
                const response = await userService.isAuthenticated(token);
                req.user = response;
                next();
            }catch (error) {
                ErrorResponse.message = error.message;
                return res.status(error.statusCode).json(ErrorResponse);
            }
        }
    }
}

module.exports = validateAuthRequest;