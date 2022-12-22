const {Schema, model} = require("mongoose");

const loanSchema = new Schema({
    quantity: Number,
    months: Number,
    quota: Number,
    account_id: String
});

const Loan = model("Loan", loanSchema);

module.exports = Loan