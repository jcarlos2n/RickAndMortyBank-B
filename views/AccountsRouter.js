

const express = require('express');
const router = express.Router();
const AccountsController = require('../controllers/AccountsController');

router.get('/getAccounts/:id' , AccountsController.getAccounts);
router.post('/createAccount', AccountsController.createAccount);

module.exports = router;