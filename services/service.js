const UserModel = require('../model/UserModel');
const VerificationOtp = require('../model/VerificationOtp');
const jwt = require('jsonwebtoken');
const {generateOTP, mailTransport } = require('../otp/mail');
const { sendError } = require('../otp/error');
const { isValidObjectId } = require('mongoose');

class service{
   static async signupuser(firstname, lastname, username, email, password, Cpassword){
      try{
          const createUser = new UserModel({firstname, lastname, username, email, password, Cpassword});
         
          const Otp = generateOTP()
          const VerificationOTP = new VerificationOtp({
            email: createUser.email,
            otp: Otp
 
          })

           await VerificationOTP.save();
          await createUser.save();

          mailTransport().sendMail({
            from: 'verifyotp@gmail.com',
            to: createUser.email,
            subject: "Please verify your email account",
            html:`<h1>${Otp}</h1>`
        })

      }catch(err){
        throw err;
      }
   }

   static async checkUser(email){
      try{
         return await UserModel.findOne({email});
     }catch(err){
       throw err;
     }
      
   }

   static async generateToken(tokenData, secretKey,jwt_expire){
      return jwt.sign(tokenData, secretKey, {expiresIn:jwt_expire});
   }

}

module.exports = service;


