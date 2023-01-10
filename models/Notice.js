const {Schema, model} = require("mongoose");

const noticeSchema = new Schema({
    quantity: {type: String, required: true},
    concept: {type: String, required: true},
    date: {type: String, required: true},
    account_id: {type: String, required: true},
    status: {type: Boolean, default: true}
});

const Notice = model("Notice", noticeSchema);

module.exports = Notice