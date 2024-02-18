const {check, validationResult} = require ("express-validator");
// const {matchesPattern} = require ("validator");


exports.validateUser = [
    check("firstname")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is missing")
    .isLength({min:3, max:20})
    .withMessage("Name must be 3 to 20 characters long"),
    
    check("lastname")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Last Name is missing")
    .isLength({min:3, max:20})
    .withMessage("Name must be 3 to 20 characters long"),
     
    check('email')
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid E-mail'),
    
    check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing")
    // .matchesPattern(RegExp(r'^[a-zA-Z0-9@#$%^&+=]*$'))
    // .withMessage("Password must contain only letters, numbers, and special characters")
    .isLength({min: 8, max: 20})
    .withMessage("Password must contain 8 or up to 20 charaters"),
]


exports.validate = (req, resp, next)=>{
    const error = validationResult(req).array()
    if(!error.length) return next()

    resp.status(400).json({success: false, error: error[0].msg})
}