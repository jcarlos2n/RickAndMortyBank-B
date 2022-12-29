

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


};

AccountsController.sendMoney = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.body.user_id;
        const moneyquantity = req.body.quantity;
        const account = await Account.findById(id);
        const friendAccount = await Account.findOne({user_id : user_id});
        if (!friendAccount) {
            return res.json({success: false, error: 'User or account doesn´t exist'});
        }else{
            const updateAccount = {balance: account.balance-moneyquantity};
            const updateFriendAccount = {balance: friendAccount.balance+moneyquantity};
            const upAccount = await Account.findByIdAndUpdate(id, updateAccount, { new: true, safe: true, upsert: true });
            const friendId = (friendAccount._id).toString();
            const upFriendAccount = await Account.findOneAndUpdate({_id: friendId}, updateFriendAccount, { new: true, safe: true, upsert: true });
            return res.json({success: true, account: upAccount, friendAccount: upFriendAccount })
        }
    } catch (error) {
        return res.json({ success: false, error: error})
    }
}

AccountsController.depositMoney = async (req, res) => {
    try {
        const { id } = req.params;
        const quantity = req.body.quantity;
        const account = await Account.findById(id);
        if (!account) {
            return res.json({success: false, error: 'User or account doesn´t exist'});

        }else{
            const update = {balance: account.balance+quantity};
            const upAccount = await Account.findByIdAndUpdate(id, update, { new: true, safe: true, upsert: true });
            return res.json({success: true, data: upAccount})
        }
    } catch (err) {
        return res.json({success: false, error: err})
    }
};

AccountsController.cashOut = async (req, res) => {
    try {
        const { id } = req.params;
        const quantity = req.body.quantity;
        const account = await Account.findById(id);
        if (!account) {
            return res.json({success: false, error: 'User or account doesn´t exist'});

        }else{
            const update = {balance: account.balance-quantity};
            const upAccount = await Account.findByIdAndUpdate(id, update, { new: true, safe: true, upsert: true });
            return res.json({success: true, data: upAccount})
        }
    } catch (err) {
        return res.json({success: false, error: err})
    }
};

module.exports = AccountsController;