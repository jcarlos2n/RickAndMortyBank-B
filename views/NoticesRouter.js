
const express = require('express');
const router = express.Router();
const NoticesController = require('../controllers/NoticesController');

// router.get('/getLoans/:id' , LoansController.getLoans);
router.post('/createnotice', NoticesController.createNotice);
router.put('/noticeview/:id', NoticesController.noticeView);

module.exports = router;