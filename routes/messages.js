const express = require('express');
const router = express.Router()
const messagesCtrl = require("../controllers/messages.js");

router.get('/', messagesCtrl.getMessages);
router.post('/', messagesCtrl.postMessages);

module.exports = router;