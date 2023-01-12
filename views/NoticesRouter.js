
const express = require('express');
const auth = require('../middlewares/auth')
const router = express.Router();
const NoticesController = require('../controllers/NoticesController');

router.get('/getnotices/:id', auth , NoticesController.getNoticeNotView);
router.get('/getallnotices/:id' , NoticesController.getAllNotices);
router.post('/createnotice', NoticesController.createNotice);
router.put('/noticeview/:id', NoticesController.noticeView);

module.exports = router;