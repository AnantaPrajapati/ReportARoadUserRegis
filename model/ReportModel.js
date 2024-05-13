const mongoose =require('mongoose');
const dbConnection = require('../config/dbConnection');
const UserModel = require('../model/UserModel');
const{Schema} = mongoose;

const ReportSchema =  new Schema({

    userId:{
        type: Schema.Types.ObjectId,
        ref:UserModel.modelName
    },
    // email: {
    //     type: String,
    //     lowercase: true,
    //     required: true
    //   },
 
    location:{
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true,
    }],
    // contentType: {
    //     type: String,
    //     // required: true
        
    // },
    severity:{
        type: String,
        required: true,
    },
    desc:{
        type: String,
        required: true
    },
    status: { 
        type: String,
        default: 'pending' 
    }
   

},{timestamps:true});

const ReportModel = dbConnection.model('Report',ReportSchema);

module.exports = ReportModel;



