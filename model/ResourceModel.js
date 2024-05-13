const mongoose =require('mongoose');
const dbConnection = require('../config/dbConnection');
const UserModel = require('../model/UserModel');
const{Schema} = mongoose;

const ResourceSchema =  new Schema({

    reportId: {
        type: Schema.Types.ObjectId,
        ref: 'Report',
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
 
    manpower:{
        type: Number,
        required: true
    },
    budget:{
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    images: [{
        type: String,
        required: true,
    }],
    status: { 
        type: String,
        default: 'Work in progress' 
    }
   

},{timestamps:true});

const ResourceModel = dbConnection.model('Resoucre',ResourceSchema);

module.exports = ResourceModel;



