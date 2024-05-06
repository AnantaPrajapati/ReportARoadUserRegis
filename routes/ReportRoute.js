const router = require('express').Router();
const ReportController = require('../controller/ReportController');
const Report = require('../admin/Report');



router.post('/report', ReportController.createReport);
router.post('/IncidentReport', ReportController.IncidentReport);
router.get('/getAllIncidentReport', ReportController.getAllIncidentReport);
router.get('/getReport', ReportController.getReport );
router.get('/resolvedReport', ReportController.resolvedReport );
router.post('/deleteReport', ReportController.deleteReport );
router.get('/nearbyHospital', ReportController.getNearbyHospitals);
router.post('/ratingFeedback', ReportController.ratingFeedback);

router.get('/admin/reports', Report.getAllReports);
router.post('/approveReport', Report.approveReport);
router.get('/getApprovedReports', Report.getApprovedReports);
router.post('/disapproveReport', Report.disapproveReport);
//for governmentOfficials
router.post('/createNews', Report.createNews);
router.get('/getNews', Report.getNews);



module.exports = router;