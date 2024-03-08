const router = require('express').Router();
const ReportController = require('../controller/ReportController');


router.post('/report', ReportController.createReport);


module.exports = router;