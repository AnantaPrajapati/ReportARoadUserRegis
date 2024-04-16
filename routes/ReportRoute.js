const router = require('express').Router();
const ReportController = require('../controller/ReportController');



router.post('/report', ReportController.createReport);
router.post('/incident', ReportController.IncidentReport);
router.get('/getReport', ReportController.getReport );


module.exports = router;