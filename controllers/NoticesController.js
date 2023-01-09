
const Notice = require('../models/Notice');
const Account = require('../models/Account');

const NoticesController = {};

const actualDate = new Date().toUTCString();

NoticesController.createNotice = async (req, res) => {
    try {
        let quantity = req.body.quantity;
        let concept = req.body.concept;
        let date = actualDate;
        let account_id = req.body.account_id;
        let status = true;

        const account = await Account.findById(account_id);
        if (account) {
            const createNotice = await Notice.create({
                quantity: quantity,
                concept: concept,
                date: date,
                account_id: account_id,
                status: status
            })
            return res.json({ success: true, data: createNotice, account: account })
        }
    } catch (error) {
        return res.json({ success: false, error: error })
    }
};

NoticesController.noticeView = async (req, res) => {
    try {
        const { id } = req.params;

        const getNotice = await Notice.findById(id);
        if (getNotice) {
            let updateNotice = { status: false};
            const upNotice = await Notice.findByIdAndUpdate(id, updateNotice, { new: true, safe: true, upsert: true })

            return res.json({ success: true, data: upNotice })
        }
    } catch (error) {
        return res.json({ success: false, error: error })
    }
};

NoticesController.getNoticeNotView = async (req, res) => {
    try {
        const { id } = req.params;
        
        const getNotices = await Notice.find({ account_id: id, status: true }).sort({'date': -1})
        return res.json({ success: true, data: getNotices })
    } catch (error) {
        
    }
};

NoticesController.getAllNotices = async (req, res) => {
    try {
        const { id } = req.params;
        
        const getNotices = await Notice.find({ account_id: id })
        return res.json({ success: true, data: getNotices })
    } catch (error) {
        
    }
};

module.exports = NoticesController;