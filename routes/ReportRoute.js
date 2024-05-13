const router = require('express').Router();
const ReportController = require('../controller/ReportController');
const Report = require('../admin/Report');
const govResourceManagement = require('../admin/govResourceManagement');



router.post('/report', ReportController.createReport);
router.post('/IncidentReport', ReportController.IncidentReport);
router.get('/getAllIncidentReport', ReportController.getAllIncidentReport);
router.get('/getIncidentReport', ReportController.getIncidentReport);
router.get('/getReport', ReportController.getReport );
router.get('/getReportHistory', ReportController.getReportHistory );
router.get('/resolvedReport', ReportController.resolvedReport );
router.post('/deleteReport', ReportController.deleteReport );
router.post('/ratingFeedback', ReportController.ratingFeedback);

//for admin
router.get('/admin/reports', Report.getAllReports);
router.get('/getNews', ReportController.getNews);
router.post('/approveReport', Report.approveReport);
router.get('/getApprovedReports', Report.getApprovedReports);
router.post('/disapproveReport', Report.disapproveReport);


//for governmentOfficials
router.post('/createNews', Report.createNews);
router.post('/ManageResource', govResourceManagement.ManageResource);
router.post('/notifyUser', Report.notifyUser);
router.post('/DeleteUser', Report.DeleteUser);




module.exports = router;