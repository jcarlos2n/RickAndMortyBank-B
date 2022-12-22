
// const User = require('../models/User');
const Account = require('../models/Account')
const mongoose = require('mongoose');

const AccountsController = {};

AccountsController.createAccount = async (req, res) => {
    try {
        let user_id = req.body.user_id;
        let balance = req.body.balance;

        const create = await Account.create({
            user_id: user_id,
            balance: balance
        })
        return res.json({ success: true, data: create })
    } catch (error) {
        return res.json({ success: false, error: error })

    }
};

AccountsController.getAccounts = async (req, res) => {
    try {
        const { id } = req.params;

        const getAllAccounts = await Account.find({ user_id: id })
        return res.json({ success: true, data: getAllAccounts })

    } catch (error) {
        return res.json({ success: false, error: "something error" })
    }


}



module.exports = AccountsController;