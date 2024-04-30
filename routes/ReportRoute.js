const router = require('express').Router();
const ReportController = require('../controller/ReportController');



router.post('/report', ReportController.createReport);
router.post('/IncidentReport', ReportController.IncidentReport);
router.get('/getReport', ReportController.getReport );
router.post('/deleteReport', ReportController.deleteReport );
router.get('/nearbyHospital', ReportController.getNearbyHospitals);

router.get('/admin/reports', ReportController.getAllReports);
router.post('/approveReport', ReportController.approveReport);
router.post('/disapprove-report/:reportId', ReportController.disapproveReport);



module.exports = router;