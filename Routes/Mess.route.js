const express = require('express');
const router = express.Router();

const Mess = require('../Controllers/Mess.Controller');

router.get('/den-phongkhach/:status', Mess.getDenPhongKhach);
router.get('/den-phongngu/:status', Mess.getDenPhongNgu);
router.get('/nhietdo', Mess.getNhietDo);
router.get('/doam', Mess.getDoAm)

router.post('/', Mess.updateDataHome)

module.exports = router;
