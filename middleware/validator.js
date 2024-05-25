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

    check("username")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Username is missing")
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
   .matches(/^[a-zA-Z0-9@#$%^&+=]*$/)
    .withMessage("Password must contain only letters, numbers, and special characters")
    .isLength({min: 8, max: 20})
    .withMessage("Password must contain 8 or up to 20 charaters"),

    check('Cpassword')
    .trim()
    .not()
    .isEmpty()
    .withMessage("confirm Password is missing")
    .matches(/^[a-zA-Z0-9@#$%^&+=]*$/)
    .withMessage("Confirm Password must match with the password")
    .isLength({min: 8, max: 20})
    .withMessage("Password must contain 8 or up to 20 charaters"),

    check('city')
    .trim()
    .not()
    .isEmpty()
    .withMessage("City is missing")

]

exports.validateRating = [
    check("Rating")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Rating is missing")
    .isLength({min:1, max:5})
    .withMessage("Rating must be 1 to 5"),
    
    check("feedback")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Feedback is missing")

]
exports.validateReport = [
    check("location")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Location is missing")
    .withMessage("Please enter the location"),
    
    check("severity")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Severity is missing")
    .withMessage("Please state the severity"),
     
    check("desc")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Description is missing")
    .withMessage("Please write some description"),
     
    
    check("images")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Image is missing")
    .withMessage("Please attach images")
 
]
exports.validateIncidentReport = [
    check("location")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Location is missing")
    .withMessage("Please enter the location"),
    
    check("title")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Title is missing")
    .withMessage("Please state the title"),
     
    check('desc')
    .trim()
    .not()
    .isEmpty()
    .withMessage("Description is missing")
    .withMessage("Please write some description"),
     
    
    check('image')
    .trim()
    .not()
    .isEmpty()
    .withMessage("Image is missing")
    .withMessage("Please attach images")
 
]

exports.validateApprove = [
    check("comment")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Comment is missing")

]
exports.validate = (req, resp, next)=>{
    const error = validationResult(req).array()
    if(!error.length) return next()

    resp.status(400).json({success: false, error: error[0].msg})
}