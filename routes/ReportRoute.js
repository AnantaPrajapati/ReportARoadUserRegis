const router = require('express').Router();
const ReportController = require('../controller/ReportController');



router.post('/report', ReportController.createReport);
router.post('/IncidentReport', ReportController.IncidentReport);
router.post('/getReport', ReportController.getReport );
router.post('/deleteReport', ReportController.deleteReport );


module.exports = router;