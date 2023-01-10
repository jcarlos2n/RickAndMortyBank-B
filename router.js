
const router = require("express").Router();
const UsersRouter = require('./views/UsersRouter');
const AccountsRouter = require('./views/AccountsRouter');
const LoansRouter = require('./views/LoansRouter');
const NoticesRouter = require('./views/NoticesRouter');

router.use('/users', UsersRouter);
router.use('/accounts', AccountsRouter);
router.use('/loans', LoansRouter);
router.use('/notices', NoticesRouter);

module.exports = router;