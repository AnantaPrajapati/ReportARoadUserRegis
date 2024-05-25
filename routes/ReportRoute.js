const router = require('express').Router();
const ReportController = require('../controller/ReportController');
const Report = require('../admin/Report');
const govResourceManagement = require('../admin/govResourceManagement');
const middleware = require('../middleware/validator');



router.post('/report',  middleware.validateReport, middleware.validate,ReportController.createReport);
router.post('/IncidentReport', middleware.validateIncidentReport, middleware.validate,ReportController.IncidentReport);
router.get('/getAllIncidentReport', ReportController.getAllIncidentReport);
router.get('/getIncidentReport', ReportController.getIncidentReport);
router.get('/getReport', ReportController.getReport );
router.get('/getReportHistory', ReportController.getReportHistory );
router.get('/resolvedReport', ReportController.resolvedReport );
router.post('/deleteReport', ReportController.deleteReport );
router.post('/deleteNews', ReportController.deleteNews );
router.post('/ratingFeedback',ReportController.ratingFeedback);
router.post('/deleteIncidentReport', ReportController.deleteIncidentReport );


//for admin
router.get('/admin/reports', Report.getAllReports);
router.get('/getNews', ReportController.getNews);
router.post('/approveReport',middleware.validateApprove, middleware.validate, Report.approveReport);
router.get('/getApprovedReports', Report.getApprovedReports);
router.post('/disapproveReport', middleware.validateApprove, middleware.validate,Report.disapproveReport);
router.post('/updateReport', Report.updateReport);


//for governmentOfficials
router.post('/createNews', Report.createNews);
router.post('/ManageResource', govResourceManagement.ManageResource);
router.post('/notifyUser', Report.notifyUser);
router.post('/DeleteUser', Report.DeleteUser);
router.post('/updateResource', govResourceManagement.updateResource);
router.post('/DeleteResource', govResourceManagement.DeleteResource);
router.post('/ResponseRating', govResourceManagement.ResponseRating);
router.post('/deleteRating', govResourceManagement.deleteRating);
router.post('/deleteIncident', govResourceManagement.deleteIncident);




module.exports = router;