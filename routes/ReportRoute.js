const router = require('express').Router();
const ReportController = require('../controller/ReportController');



router.post('/report', ReportController.createReport);
router.get('/getReport', ReportController.getReport );


module.exports = router;