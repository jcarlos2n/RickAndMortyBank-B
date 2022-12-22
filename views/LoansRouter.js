

const express = require('express');
const router = express.Router();
const LoansController = require('../controllers/LoansController');

router.get('/getLoans/:id' , LoansController.getLoans);
router.post('/createLoan', LoansController.createNewLoan);

module.exports = router;