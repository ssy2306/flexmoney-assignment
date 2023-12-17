const express = require('express');
const router = express.Router();

const user = require('../controllers/users/users.js');
router.post('/user', user);

module.exports = router;