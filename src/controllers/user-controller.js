const {StatusCodes} = require('http-status-codes');
const  AppError = require('../utils/errors/app-error');
const {userService} = require('../services');
const {SuccessResponse  , ErrorResponse} = require('../utils/common');

async function createUser(req, res) {
    try {
        const user = await userService.createUser({
            email: req.body.email,
            password: req.body.password
        });
        SuccessResponse.data = user;
        res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.message = error.message;
        res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function signIn(req, res) {
    try {
        const response = await userService.signIn({
            email: req.body.email,
            password: req.body.password
        });
        SuccessResponse.data = response;
        res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.message = error.message;
        res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

module.exports = {
    createUser,
    signIn
}