
const Loan = require("../models/Loan");
const Account = require("../models/Account")

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

module.exports = LoansController;