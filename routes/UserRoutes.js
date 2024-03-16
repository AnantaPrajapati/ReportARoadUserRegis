const router = require('express').Router();

const UserControllers = require('../controller/UserControllers');

const ProfileController = require('../controller/ProfileController');

const middleware = require('../middleware/validator');

const {isresetOtpValid}= require('../middleware/resetOtp');

router.post('/signup', middleware.validateUser, middleware.validate, UserControllers.signup);
router.post('/login', UserControllers.login);
router.post('/verifyEmail', UserControllers.verifyEmail);
router.post('/forgetPassword',  UserControllers.forgetPassword);
router.post('/resetPassword', UserControllers.resetPassword);
router.get('/logout', UserControllers.logout);
router.post('/verifyResetOtp', UserControllers.verifyResetOtp);

router.get('/profile/:id', ProfileController.profile);
// router.post('/UpdateProfile', ProfileController.profile);


module.exports = router;

