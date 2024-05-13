const router = require('express').Router();

const UserControllers = require('../controller/UserControllers');

const ProfileController = require('../controller/ProfileController');

const middleware = require('../middleware/validator');

// const {isresetOtpValid}= require('../middleware/resetOtp');

router.post('/signup', middleware.validateUser, middleware.validate, UserControllers.signup);
router.post('/login', UserControllers.login);
router.post('/verifyEmail', UserControllers.verifyEmail);
router.post('/forgetPassword',  UserControllers.forgetPassword);
router.post('/resetPassword', UserControllers.resetPassword);
router.get('/logout', UserControllers.logout);
router.post('/verifyResetOtp', UserControllers.verifyResetOtp);

router.get('/profile', ProfileController.profile);
router.post('/changePassword', ProfileController.ChangePassword);
router.post('/DeleteAccount', ProfileController.DeleteAccount);

router.post('/UpdateProfile/', ProfileController.updateProfile);
router.post('/ChangePassword/:id', ProfileController.ChangePassword);



module.exports = router;

