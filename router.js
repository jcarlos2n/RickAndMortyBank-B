
const router = require("express").Router();

const UsersRouter = require('./views/UsersRouter');
const AccountsRouter = require('./views/AccountsRouter');

router.use('/users', UsersRouter);
router.use('/accounts', AccountsRouter);

module.exports = router;