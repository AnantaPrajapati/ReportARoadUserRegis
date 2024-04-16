const nodemailer = require("nodemailer");

exports.generateOTP= () =>{
let otp = "";
  for(let i = 0; i<=3; i++){
     const randVal = Math.round(Math.random() * 9)
     otp = otp + randVal
  }
  return otp;
}

// exports.mailTransport = () => 
// nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: process.env.MAILTRAP_USERNAME,
//     pass: process.env.MAILTRAP_PASSWORD
//   },

// });


exports.mailTransport = () => 
nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
      user: process.env.GMAIL_USERNAME, // Your Gmail address
      pass: process.env.GMAIL_PASSWORD // Your Gmail password
  },
});



