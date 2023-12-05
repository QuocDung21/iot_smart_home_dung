const express = require('express');
const router = express.Router();

const Mess = require('../Controllers/Mess.Controller');

router.get('/den-phongkhach/:status', Mess.getDenPhongKhach);

router.post('/', Mess.updateDataHome)

module.exports = router;
