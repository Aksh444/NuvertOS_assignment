const express = require('express');
const { register, login } = require('../controllers/auth.controllers.js');
const router = express.Router();

router.post('/register', register);
router.post('/login', register.length ? login : login); // just ensure export

module.exports = router;
