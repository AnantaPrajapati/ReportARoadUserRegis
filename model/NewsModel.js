const mongoose =require('mongoose');
const dbConnection = require('../config/dbConnection');
const{Schema} = mongoose;

const NewsSchema =  new Schema({
    title:{
        type: String,
        required: true
    },
 
    location:{
        type: String,
        required: true
    },
    image:{
        type: String, 
        // required: true,
        unique: true
    },
    desc:{
        type: String,
        required: true
    },
   
},{timestamps:true});

const NewsModel = dbConnection.model('News',NewsSchema);

module.exports = NewsModel;



