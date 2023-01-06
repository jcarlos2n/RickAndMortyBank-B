
const express = require('express');
const router = express.Router();
const NoticesController = require('../controllers/NoticesController');

router.get('/getnotices/:id' , NoticesController.getNoticeNotView);
router.get('/getallnotices/:id' , NoticesController.getAllNotices);
router.post('/createnotice', NoticesController.createNotice);
router.put('/noticeview/:id', NoticesController.noticeView);

module.exports = router;