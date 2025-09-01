const {UserRepository} = require('../repositories');
const {bcrypt} = require('bcrypt')
const userRepository = new UserRepository();
const {AUTH} = require('../utils/common');
const AppError = require('../utils/errors/app-error');
const {StatusCodes} = require('http-status-codes');


function createUser(data) {
   try{
     const user = userRepository.create(data);
     return user;
   }catch (error) {
      if(error.name =='SequelizeValidationError'){
        let explanation =[];
        error.errors.forEach((err) => {
          explanation.push(err.message);
        });
        throw new AppError(explanation, StatusCodes.BAD_REQUEST);
      }
      throw new AppError("Can not create user object" , StatusCodes.INTERNAL_SERVER_ERROR);
   }
}

async function signIn(data) {
   try{
     const user = await userRepository.getUserByEmail(data.email);
     if(!user){
       throw new AppError('No user found for the given email', StatusCodes.NOT_FOUND);
     }
     const result = await AUTH.checkPassword(data.password, user.password);
     console.log(result);
     if(!result){
       throw new AppError('Incorrect password', StatusCodes.BAD_REQUEST);
     }
     const jwt =  AUTH.createToken({id: user.id, email: user.email});
     return jwt;
   }catch (error) {
     if(error instanceof AppError){
       throw error;
     }
     throw new AppError("Something went wrong while signing in", StatusCodes.INTERNAL_SERVER_ERROR);
   }

}

   

module.exports = {
    createUser,
    signIn
}
