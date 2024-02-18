// const UserModel = require('../model/UserModel');
// const jwt = require('jsonwebtoken');

// class UserService{
//    static async signupuser(firstname, lastname, username, email, password, Cpassword){
//       try{
//           const createUser = new UserModel({firstname, lastname, username, email, password, Cpassword});
//           return await createUser.save();
//       }catch(err){
//         throw err;
//       }
//    }

//    static async checkUser(email){
//       try{
//          return await UserModel.findOne({email});
//      }catch(err){
//        throw err;
//      }
      
//    }

//    static async generateToken(tokenData, secretKey,jwt_expire){
//       return jwt.sign(tokenData, secretKey, {expiresIn:jwt_expire});
//    }

// }

// module.exports = UserService;