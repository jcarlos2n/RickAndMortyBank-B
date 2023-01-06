const {Schema, model} = require("mongoose");

const noticeSchema = new Schema({
    quantity: String,
    concept: String,
    date: String,
    account_id: String,
    status: Boolean
});

const Notice = model("Notice", noticeSchema);

module.exports = Notice