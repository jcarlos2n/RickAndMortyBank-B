
const express = require('express');
const router = express.Router();
const LoansController = require('../controllers/LoansController');
const auth  = require('../middlewares/auth')

router.get('/getLoans/:id' , LoansController.getLoans);
router.post('/createLoan',auth, LoansController.createNewLoan);
router.put('/payQuote/:id', LoansController.payQuote);

module.exports = router;