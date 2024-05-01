const router = require('express').Router();
const ReportController = require('../controller/ReportController');
const Report = require('../admin/Report');



router.post('/report', ReportController.createReport);
router.post('/IncidentReport', ReportController.IncidentReport);
router.get('/getReport', ReportController.getReport );
router.post('/deleteReport', ReportController.deleteReport );
router.get('/nearbyHospital', ReportController.getNearbyHospitals);

router.get('/admin/reports', Report.getAllReports);
router.post('/approveReport', Report.approveReport);
router.get('/getApprovedReports', Report.getApprovedReports);
router.post('/disapproveReport', Report.disapproveReport);



module.exports = router;