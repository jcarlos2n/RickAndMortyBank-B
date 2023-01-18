
const Loan = require("../models/Loan");
const Account = require("../models/Account");
const Notice = require('../models/Notice');
const { findByIdAndDelete } = require("../models/Loan");

const LoansController = {};
const actualDate = new Date().toUTCString();

LoansController.createNewLoan = async (req, res) => {
    try {
        const userId = req.user.user._id;
        const quantity = req.body.quantity;
        const months = req.body.months;
        const account_id = req.body.account_id;

        const userAccount = await Account.findOne({ _id: account_id, user_id: userId })

        if (quantity == "" || months == "" || account_id == "") {
            return res.json({ success: false, message: "Please fill in the missing fields" })
        }

        if (!userAccount) {
            return res.json({ success: false, message: "This account does not belong to this user" })

        }

        const createLoan = await Loan.create({
            quantity,
            months,
            quota: quantity / months,
            account_id
        })

        const quantityF = `+${quantity}€`;
        const concept = `Has pedido un préstamo de ${quantity}€, a ${months} meses, con una cuota mensual de ${quantity / months}€`;
        const createNotice = await Notice.create({
            quantity: quantityF,
            concept,
            date: actualDate,
            account_id,
        });

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
            return res.json({ success: false, message: "Loan or Account don´t found" });
        }

        const opQuantity = getLoan.quantity - getLoan.quota;
        const opQuota = getLoan.months - 1;
        const updateLoan = { quantity: opQuantity, months: opQuota };
        const opAccount = account.balance - getLoan.quota;
        const updateAccount = { balance: opAccount };
        const upLoan = await Loan.findByIdAndUpdate(id, updateLoan, { new: true, safe: true, upsert: true })
        const upAccount = await Account.findByIdAndUpdate(getLoan.account_id, updateAccount, { new: true, safe: true, upsert: true })

        if (upLoan.quantity <= 0) {
            console.log(upLoan.quantity)
            const quantityF = `-${getLoan.quota}€`;
            const concept = `Has finalizado todas las cuotas de este prestamo ${getLoan._id}.`;
            const createNotice = await Notice.create({
                quantity: quantityF,
                concept,
                date: actualDate,
                account_id: getLoan.account_id,
            });
            const deleteLoan = await Loan.findByIdAndDelete(id);

            return res.json({ succes: true, loan: upLoan, account: upAccount, data: deleteLoan})
        } else {
            
            const quantityF = `-${getLoan.quota}€`;
            const concept = `Has pagado una cuota de ${getLoan.quota} de tu préstamo, ya solo te quedarian ${opQuota} meses por pagar`;
            const createNotice = await Notice.create({
                quantity: quantityF,
                concept,
                date: actualDate,
                account_id: getLoan.account_id,
            });

            return res.json({ success: true, loan: upLoan, account: upAccount })
        }
    } catch (error) {
        return res.json({ success: false, error: error })
    }
};

module.exports = LoansController;