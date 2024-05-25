const mongoose =require('mongoose');
const dbConnection = require('../config/dbConnection');
const UserModel = require('../model/UserModel');
const{Schema} = mongoose;

const ResourceSchema =  new Schema({

    // reportId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Report',
    // },
    // userId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    // reportId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Report',
    // },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
 
    manpower:{
        type: String,
        required: true
    },
    budget:{
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
 
    statuss: { 
        type: String,
        // default: 'Work in progress' 
    },
    image: {
        type: String,
        required: true,
    },

},{timestamps:true});

const ResourceModel = dbConnection.model('resources',ResourceSchema);

module.exports = ResourceModel;



