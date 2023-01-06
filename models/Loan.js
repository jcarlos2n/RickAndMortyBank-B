const {Schema, model} = require("mongoose");

const loanSchema = new Schema({
    quantity: {type: Number, required: true},
    months: {type: Number, required: true},
    quota: {type: Number, required: true},
    account_id: {type: String, required: true}
});

const Loan = model("Loan", loanSchema);

module.exports = Loan