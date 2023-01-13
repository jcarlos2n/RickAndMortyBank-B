
const express = require('express');
const auth = require('../middlewares/auth')
const router = express.Router();
const AccountsController = require('../controllers/AccountsController');

router.get('/getallaccounts/:id', auth, AccountsController.getAllAccounts);
router.get('/getaccount/:id', auth, AccountsController.getAccount);
router.post('/createAccount', AccountsController.createAccount);
router.put('/sendmoney/:id', auth, AccountsController.sendMoney);
router.put('/depositmoney/:id', auth, AccountsController.depositMoney);
router.put('/cashout/:id', auth, AccountsController.cashOut);

module.exports = router;