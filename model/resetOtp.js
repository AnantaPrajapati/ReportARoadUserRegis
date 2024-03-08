const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const dbConnection = require('../config/dbConnection');

const{Schema} = mongoose;

const ResetOtpSchema =  new Schema({
  email: {
    type: String,
    lowercase: true,
    required: true
  },
  otp:{
    type: String,
    required: true,
  },
  createdAt:{
    type: Date,
    expires: 3600,
    default: Date.now() 
  }
});

ResetOtpSchema.pre('save', async function(next){
  if(this.isModified("otp")){
    const hash = await bcrypt.hash(this.otp, 8);
    this.otp=hash;
  }
  next();
});

ResetOtpSchema.methods.compareotp = async function (hashedOtp) {
    try {
        const isMatch = await bcrypt.compare(this.otp, hashedOtp);
        return isMatch;
    } catch (error) {
        throw new Error("Error comparing OTPs: " + error.message);
    }
};


const ResetOtpModel = dbConnection.model('ResetOtp',ResetOtpSchema);

module.exports = ResetOtpModel;