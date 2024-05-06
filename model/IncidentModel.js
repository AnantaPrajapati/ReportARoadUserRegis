const mongoose =require('mongoose');
const dbConnection = require('../config/dbConnection');
const UserModel = require('../model/UserModel');
const{Schema} = mongoose;

const IncidentSchema =  new Schema({

    // userId:{
    //     type: Schema.Types.ObjectId,
    //     ref:UserModel.modelName
    // },
    userId:{
        type: Schema.Types.ObjectId,
        ref:UserModel.modelName
    },
    title:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true
    },
    image:{
        type: String, 
        required: true,
        unique: true
    },
    contentType: {
        type: String,
        // required: true
        
    },
    desc:{
        type: String,
        required: true
    },
   

},{timestamps:true});

const IncidentModel = dbConnection.model('Incident',IncidentSchema);

module.exports = IncidentModel;



