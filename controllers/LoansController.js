
const Loan = require("../models/Loan");
const Account = require("../models/Account");

const LoansController = {};

LoansController.createNewLoan = async (req, res) => {
    try {
        let quantity = req.body.quantity;
        let months = req.body.months;
        let account_id = req.body.account_id;

        const createLoan = await Loan.create({
            quantity: quantity,
            months: months,
            quota: quantity / months,
            account_id: account_id
        })

        const sumQuantity = await Account.findByIdAndUpdate(account_id, { $inc: { "balance": quantity } }, { new: false, safe: true, upsert: true })
        return res.json({ success: true, data: createLoan, account: sumQuantity })
    } catch (error) {
        return res.json({ success: false, error: error })
    }
};

LoansController.getLoans = async (req, res) => {
    try {
        const { id } = req.params;

        const getAllLoans = await Loan.find({ account_id: id })
        return res.json({ success: true, data: getAllLoans })

    } catch (error) {
        return res.json({ success: false, error: error })
    }

};

LoansController.payQuote = async (req, res) => {
    try {
        const { id } = req.params;

        const getLoan = await Loan.findById(id);
        const account = await Account.findById(getLoan.account_id);
        const opLoan = getLoan.quantity-getLoan.quota;
        let updateLoan = { quantity : opLoan};
        const opAccount = account.balance-getLoan.quota;
        const updateAccount = { balance : opAccount};
        const upLoan = await Loan.findByIdAndUpdate(id, updateLoan, { new: true, safe: true, upsert: true })
        const upAccount = await Account.findByIdAndUpdate(getLoan.account_id, updateAccount, { new: true, safe: true, upsert: true })
        return res.json({ success: true, loan: upLoan, account: upAccount })
    } catch (error) {
        return res.json({ success: false, error: error })
    }
}

module.exports = LoansController;