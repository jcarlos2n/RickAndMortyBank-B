
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const UsersController = require('../controllers/UsersController');

router.get('/', auth, UsersController.getUsers);
router.get('/get/:id' , UsersController.getData);
router.post('/signup', UsersController.postUser);
router.post('/login', UsersController.loginUser);

module.exports = router;