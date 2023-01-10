
const Notice = require('../models/Notice');
const Account = require('../models/Account');

const NoticesController = {};
const actualDate = new Date().toUTCString();

NoticesController.createNotice = async (req, res) => {
    try {
        const quantity = req.body.quantity;
        const concept = req.body.concept;
        const date = actualDate;
        const account_id = req.body.account_id;
        const account = await Account.findById(account_id);

        if (!account) {
            return res.json({ success: true, message: "Account doesn´t found"});
        }

        const createNotice = await Notice.create({
            quantity,
            concept,
            date,
            account_id
        })

        return res.json({ success: true, data: createNotice, account: account });
    } catch (error) {
        return res.json({ success: false, error: error });
    }
};

NoticesController.noticeView = async (req, res) => {
    try {
        const { id } = req.params;
        const getNotice = await Notice.findById(id);

        if (!getNotice) {
            return res.json({ success: true, message: "Notification doesn´t found"})
        }

        let updateNotice = { status: false };
        const upNotice = await Notice.findByIdAndUpdate(id, updateNotice, { new: true, safe: true, upsert: true })

        return res.json({ success: true, data: upNotice })
    } catch (error) {
        return res.json({ success: false, error: error })
    }
};

NoticesController.getNoticeNotView = async (req, res) => {
    try {
        const { id } = req.params;
        const getNotices = await Notice.find({ account_id: id, status: true }).sort({ 'date': -1 })

        return res.json({ success: true, data: getNotices })
    } catch (error) {
        return res.json({ success: false, error: error })
    }
};

NoticesController.getAllNotices = async (req, res) => {
    try {
        const { id } = req.params;
        const getNotices = await Notice.find({ account_id: id })

        return res.json({ success: true, data: getNotices })
    } catch (error) {
        return res.json({ success: false, error: error })
    }
};

module.exports = NoticesController;