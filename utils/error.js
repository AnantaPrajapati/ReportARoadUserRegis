const crypto = require("crypto");


exports.sendError = (resp, error, status = 401) =>{
    resp.status(status).json({success: false, error});
}

exports.createRandomBytes = () => new Promise ((resolve, reject) =>{
    crypto.randomBytes(30, (err, buff) => {
        if(err) reject(err);

        const Otp = buff.toString('hex');
        resolve(Otp);
    });
});