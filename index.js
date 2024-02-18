const app = require('./app');
const dbConnection = require('./config/dbConnection');
 const UserModel = require('./model/UserModel');
const port = 3000;
const dotenv = require('dotenv').config();

// const cors = require('cors');

// app.use(cors());

app.get('/',(req,resp)=>{
    resp.send("YO")
});

app.listen(port,()=>{
    console.log(`server is running on port http://localhost:${port}`);
});