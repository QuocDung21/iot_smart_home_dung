const createError = require('http-errors');
const mongoose = require('mongoose');
const sendEmail = require("../Mail/mail");
const Esp = require('../Models/Esp.model');

module.exports = {


    createEsp: async (req, res, next) => {
        try {
            const {temp, humid, chuyendong, door} = req.body;
            if (temp >= 40) {
                await sendEmail(
                    "quocdung112001@gmail.com",
                    "Cảnh báo! Nhiệt độ cao",
                    "Cảnh báo! Nhiệt độ cao",
                    `Nhiệt độ hiện tại là: ${temp} độ C. Vui lòng kiểm tra hệ thống.</p>`
                )
            }
            const espData = new Esp({temp, humid, chuyendong});
            const result = await espData.save();
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error.name === 'ValidationError') {
                next(createError(422, error.message));
                return;
            }
            next(error);
        }
    }


};
