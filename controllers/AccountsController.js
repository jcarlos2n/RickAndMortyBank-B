
const Account = require('../models/Account');
const Notice = require('../models/Notice');
const User = require('../models/User');

const AccountsController = {};
const actualDate = new Date().toUTCString();

AccountsController.createAccount = async (req, res) => {
    try {
        let user_id = req.body.user_id;
        let balance = req.body.balance;
        const create = await Account.create({
            user_id: user_id,
            balance: balance
        })

        return res.json({ success: true, data: create });
    } catch (error) {
        return res.json({ success: false, error: error });

    }
};

AccountsController.getAllAccounts = async (req, res) => {
    try {
        const { id } = req.params;
        const getAccounts = await Account.find({ user_id: id })

        return res.json({ success: true, data: getAccounts })
    } catch (error) {
        return res.json({ success: false, error: "something error" })
    }
};

AccountsController.getAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const getAccount = await Account.findById(id);

        if (!getAccount) {
            return res.json({ success: false, error: 'Account doesn´t found' });
        }

        return res.json({ success: true, data: getAccount });
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
        const user = await User.findById(account.user_id);
        const friendUser = await User.findById(user_id);
        const friendAccount = await Account.findOne({ user_id: user_id });

        if (moneyquantity == '' || user_id == '') {
            return res.json({ success: false, error: 'Please fill in the missing fields' })
        }
        if (!friendAccount) {
            return res.json({ success: false, error: 'User or account doesn´t exist' });
        }

        const quantityF = `+${moneyquantity}€`;
        const concept = `${user.name} te ha enviado dinero`;
        const createNotice = await Notice.create({
            quantity: quantityF,
            concept,
            date: actualDate,
            account_id: friendAccount._id,
        });

        const quantityO = `-${moneyquantity}€`;
        const conceptO = `Has enviado dinero a ${friendUser.name}`;
        const createNoticeForMe = await Notice.create({
            quantity: quantityO,
            concept: conceptO,
            date: actualDate,
            account_id: id,
        });
        
        const updateAccount = { balance: account.balance - moneyquantity };
        const updateFriendAccount = { balance: friendAccount.balance + moneyquantity };
        const upAccount = await Account.findByIdAndUpdate(id, updateAccount, { new: true, safe: true, upsert: true });
        const friendId = (friendAccount._id).toString();
        const upFriendAccount = await Account.findOneAndUpdate({ _id: friendId }, updateFriendAccount, { new: true, safe: true, upsert: true });

        return res.json({ success: true, account: upAccount, friendAccount: upFriendAccount })
    } catch (error) {
        return res.json({ success: false, error: error })
    }
};

AccountsController.depositMoney = async (req, res) => {
    try {
        const { id } = req.params;
        const quantity = req.body.quantity;
        const account = await Account.findById(id);

        if (!account) {
            return res.json({ success: false, error: 'User or account doesn´t exist' });
        }

        const update = { balance: account.balance + quantity };
        const upAccount = await Account.findByIdAndUpdate(id, update, { new: true, safe: true, upsert: true });

        const quantityF = `+${quantity}€`;
        const concept = `Has ingresado ${quantity}€ desde un cajero`;
        const createNotice = await Notice.create({
            quantity: quantityF,
            concept,
            date: actualDate,
            account_id: id,
        });

        return res.json({ success: true, data: upAccount });
    } catch (err) {
        return res.json({ success: false, error: err });
    }
};

AccountsController.cashOut = async (req, res) => {
    try {
        const { id } = req.params;
        const quantity = req.body.quantity;
        const account = await Account.findById(id);

        if (quantity == '') {
            return res.json({ success: false, error: 'Please, fill in the missing fields'})
        }

        if (!account) {
            return res.json({ success: false, error: 'User or account doesn´t exist' });
        }

        const update = { balance: account.balance - quantity };
        const upAccount = await Account.findByIdAndUpdate(id, update, { new: true, safe: true, upsert: true });

        const quantityF = `-${quantity}€`;
        const concept = `Has retirado ${quantity}€ desde un cajero`;
        const createNotice = await Notice.create({
            quantity: quantityF,
            concept,
            date: actualDate,
            account_id: id,
        });

        return res.json({ success: true, data: upAccount });
    } catch (err) {
        return res.json({ success: false, error: err });
    }
};

module.exports = AccountsController;