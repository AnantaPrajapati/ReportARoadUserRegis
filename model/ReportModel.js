const mongoose =require('mongoose');
const dbConnection = require('../config/dbConnection');
const UserModel = require('../model/UserModel');
const{Schema} = mongoose;

const ReportSchema =  new Schema({

    userId:{
        type: Schema.Types.ObjectId,
        ref:UserModel.modelName
    },
 
    location:{
        type: String,
        required: true
    },
    photo:{
        data: Buffer, 
        contentType: String 
    },
    severity:{
        type: String,
        required: true,
    },
    desc:{
        type: String,
        required: true
    },
   

});

const ReportModel = dbConnection.model('Report',ReportSchema);

module.exports = ReportModel;