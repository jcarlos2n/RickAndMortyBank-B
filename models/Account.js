const {Schema, model} = require("mongoose");

const accountSchema = new Schema({
    user_id: String,
    balance: Number
});

const Account = model("Account", accountSchema);

module.exports = Account