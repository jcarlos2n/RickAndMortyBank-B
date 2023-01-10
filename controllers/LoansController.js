
const Loan = require("../models/Loan");
const Account = require("../models/Account");

const LoansController = {};

LoansController.createNewLoan = async (req, res) => {
    try {
        const quantity = req.body.quantity;
        const months = req.body.months;
        const account_id = req.body.account_id;

        if (quantity == "" || months == "" || account_id == "") {
            return res.json({ success: false, message: "Please fill in the missing fields"})
        }

        const createLoan = await Loan.create({
            quantity,
            months,
            quota: quantity / months,
            account_id
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

        return res.json({ success: true, data: getAllLoans });
    } catch (error) {
        return res.json({ success: false, error: error });
    }
};

LoansController.payQuote = async (req, res) => {
    try {
        const { id } = req.params;
        const getLoan = await Loan.findById(id);
        const account = await Account.findById(getLoan.account_id);

        if (!getLoan || !account) {
            return res.json({ success: false, message: "Loan or Account don´t found"});
        }

        const opQuantity = getLoan.quantity-getLoan.quota;
        const opQuota = getLoan.months-1;
        const updateLoan = { quantity : opQuantity, months: opQuota};
        const opAccount = account.balance-getLoan.quota;
        const updateAccount = { balance : opAccount};
        const upLoan = await Loan.findByIdAndUpdate(id, updateLoan, { new: true, safe: true, upsert: true })
        const upAccount = await Account.findByIdAndUpdate(getLoan.account_id, updateAccount, { new: true, safe: true, upsert: true })
        
        return res.json({ success: true, loan: upLoan, account: upAccount })
    } catch (error) {
        return res.json({ success: false, error: error })
    }
};

module.exports = LoansController;