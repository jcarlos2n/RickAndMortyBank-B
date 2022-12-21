
// const User = require('../models/User');
const Account = require('../models/Account')
const mongoose = require('mongoose');

const AccountsController = {};

AccountsController.createAccount = async (req, res) => {

    let user_id = req.body.user_id;
    let balance = req.body.balance;


    Account.create({
        user_id: user_id,
        balance: balance
    }).then(user => {
        res.send(`Account has been added succesfully`);

    }).catch(err => {
        res.send(err);
    })
};

AccountsController.getAccounts = async (req, res) => {
    try {
        const {id} = req.params;

        const getAllAccounts = await Account.findOne({ user_id : id})
        return res.json({success: true, data: getAllAccounts})
        
    } catch (error) {
        return res.json({ success: false, error: "something error" })
    }

    
}



module.exports = AccountsController;