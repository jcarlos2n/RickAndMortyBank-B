

const express = require('express');
const router = express.Router();
const AccountsController = require('../controllers/AccountsController');

router.get('/getAccounts/:id' , AccountsController.getAccounts);
router.post('/createAccount', AccountsController.createAccount);
router.put('/sendmoney/:id', AccountsController.sendMoney);
router.put('/depositmoney/:id', AccountsController.depositMoney);

module.exports = router;