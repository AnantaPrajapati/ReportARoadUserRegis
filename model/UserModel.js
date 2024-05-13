const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const dbConnection = require('../config/dbConnection');
const { sendError } = require('../utils/error');
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
        required: [true, "email can't be empty"],
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "email format is not correct",
        ],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "password is required"],
    },
    Cpassword:{
        type: String,
        required: [true, "password is required"],
    },
    role:{
        type: String,
        
    },
    city:{
        type: String,
    },
    verified:{
        type: Boolean,
        default: false,
        required: true,
    },
},{timestamps:true});

UserSchema.pre('save', async function(next){
    try{
        const user = this;
       
        if(user.password !== user.Cpassword){

            const error = new Error("Password do not match");
            error.code = 400;
            return sendError(error);
        } 
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