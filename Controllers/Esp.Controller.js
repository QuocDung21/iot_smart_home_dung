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
                    `
                        <p style="font-size: 16px; color: #ff0000;">Nhiệt độ hiện tại là: ${temp} độ C. Vui lòng kiểm tra hệ thống.</p>
                        <img src="https://i.pinimg.com/736x/5e/7b/2a/5e7b2a3f61a11c75edba60d7320e9a79.jpg" alt="Temperature Warning" style="max-width: 100%;">
                        `
                );
            }

            if (chuyendong == 1) {
                await sendEmail(
                    "quocdung112001@gmail.com",
                    "Cảnh báo! Phát hiện có người",
                    "Cảnh báo! Phát hiện có người",
                    `
                        <p style="font-size: 16px; color: #0066cc;">Cảnh báo phát hiện có chuyển động.</p>
                        <img src="https://i.pinimg.com/736x/5e/7b/2a/5e7b2a3f61a11c75edba60d7320e9a79.jpg" alt="Motion Detection" style="max-width: 100%;">
                        `
                );
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
