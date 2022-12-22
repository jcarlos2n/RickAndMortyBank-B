
const router = require("express").Router();

const UsersRouter = require('./views/UsersRouter');
const AccountsRouter = require('./views/AccountsRouter');
const LoansRouter = require('./views/LoansRouter');

router.use('/users', UsersRouter);
router.use('/accounts', AccountsRouter);
router.use('/loans', LoansRouter);

module.exports = router;