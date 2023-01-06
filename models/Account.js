const {Schema, model} = require("mongoose");

const accountSchema = new Schema({
    user_id: {type: String, required: true},
    balance: {type: Number, required: true}
});

const Account = model("Account", accountSchema);

module.exports = Account