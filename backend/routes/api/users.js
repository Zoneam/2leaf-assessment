const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');


router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);
router.post('/check-token', ensureLoggedIn, usersCtrl.checkToken);
router.post('/confirm-email', usersCtrl.confirmEmail);


module.exports = router;