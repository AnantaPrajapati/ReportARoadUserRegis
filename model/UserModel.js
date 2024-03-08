const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const dbConnection = require('../config/dbConnection');
const { sendError } = require('../otp/error');
// const VerificationOtp = require('../model/VerificationOtp'); 

const{Schema} = mongoose;

const UserSchema =  new Schema({
    firstname:{
        type: String,
        lowercase: true,
        required: true

    },
    lastname:{
        type: String,
        lowercase: true,
        required: true
    },
    username:{
        type: String,
        lowercase: true,
        required: true,
        unique: true

    },
    email:{
        type: String,
        lowercase: true,
        required: true,
        unique: true

    },
    password:{
        type: String,
        required: true
    },
    Cpassword:{
        type: String,
        required: true 
    },
    verified:{
        type: Boolean,
        default: false,
        required: true,
    },
});

UserSchema.pre('save', async function(next){
    try{
        const user = this;
        //checking if password matches or not 
        if(user.password !== user.Cpassword){

            const error = new Error("Password do not match");
            error.code = 400;
            return sendError(error);
        }
        //hashing password 
        const salt = await(bcrypt.genSalt(11));
        const hashPass = await bcrypt.hash(user.password, salt);
        const hashCpass = await bcrypt.hash(user.Cpassword, salt);
        user.password = hashPass;
        user.Cpassword = hashCpass;
        next();
    }catch(err){
        next(err);
       

    }
});

UserSchema.methods.comparePassword = async  function (userPassword){
    try {
        const isMatch = await bcrypt.compare(userPassword, this.password);
        return isMatch;
    } catch (err) {
        throw err;
    }
}

const UserModel = dbConnection.model('Signup',UserSchema);

module.exports = UserModel;