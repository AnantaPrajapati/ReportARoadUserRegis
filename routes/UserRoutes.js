const router = require('express').Router();

const UserControllers = require('../controller/UserControllers');

const middleware = require('../middleware/validator');

const {isresetOtpValid}= require('../middleware/resetOtp');

router.post('/signup', middleware.validateUser, middleware.validate, UserControllers.signup);
router.post('/login', UserControllers.login);
router.post('/verifyEmail', UserControllers.verifyEmail);
router.post('/forgetPassword',  UserControllers.forgetPassword);
router.post('/resetPassword', isresetOtpValid, UserControllers.resetPassword);

module.exports = router;

