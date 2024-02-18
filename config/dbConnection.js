const mongoose = require('mongoose');


const Connection = mongoose.createConnection('mongodb://127.0.0.1:27017/signup').on('open', () => {
    console.log("Connected");
})
    .on('error', () => {
        console.log("Connection error")
    });

module.exports = Connection;