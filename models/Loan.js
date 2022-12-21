const {Schema, model} = require("mongoose");

const loanSchema = new Schema({
    cuantity: Number,
    months: Number,
    quota: Number
});

const Loan = model("Loan", loanSchema);

module.exports = Loan