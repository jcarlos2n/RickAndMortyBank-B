
const express = require('express');
const router = express.Router();
const AccountsController = require('../controllers/AccountsController');

router.get('/getallaccounts/:id' , AccountsController.getAllAccounts);
router.get('/getaccount/:id' , AccountsController.getAccount);
router.post('/createAccount', AccountsController.createAccount);
router.put('/sendmoney/:id', AccountsController.sendMoney);
router.put('/depositmoney/:id', AccountsController.depositMoney);
router.put('/cashout/:id', AccountsController.cashOut);

module.exports = router;