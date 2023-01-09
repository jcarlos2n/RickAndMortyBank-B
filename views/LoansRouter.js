

const express = require('express');
const router = express.Router();
const LoansController = require('../controllers/LoansController');


router.get('/getLoans/:id' , LoansController.getLoans);
router.post('/createLoan', LoansController.createNewLoan);
router.put('/payQuote/:id', LoansController.payQuote);

module.exports = router;