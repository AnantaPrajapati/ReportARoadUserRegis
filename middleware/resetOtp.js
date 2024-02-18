const User = require('../model/UserModel');
const ResetOtp = require('../model/resetOtp');
const { isValidObjectId } = require('mongoose');
const { sendError } = require('../otp/error');

exports.isresetOtpValid = async (req, resp, next) => {
    const{Otp, id}= req.query;
    if(!Otp || !id )
     return sendError(resp, "Invalid request");

    if(!isValidObjectId(id)) 
    return sendError(resp, "Invalid user");

  const user =  await User.findById(id)
  if(!user) 
    return sendError(resp, "User not found");

   const resetOtp = await ResetOtp.findOne({owner: user._id})
   if(!resetOtp) 
    return sendError(resp, "Reset Otp not found");

   const isValid = await resetOtp.compareotp(Otp)
   if(!isValid) 
   return sendError(resp, "Reset Otp is not valid");
   
   req.user = user
   next()
};