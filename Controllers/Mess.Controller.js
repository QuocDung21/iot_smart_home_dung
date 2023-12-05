const createError = require('http-errors');
const mongoose = require('mongoose');

const Home = require('../Models/Home.model');
const Esp = require("../Models/Esp.model");

module.exports = {
    getDenPhongKhach: async (req, res, next) => {
        const status = req.param();
        try {
            const result = await Home.findOne({_id: "656e303ac83ee75dbcc35f26"}, {__v: 0});
            console.log(result)
            if (!result) {
                return res.status(404).json({error: "Data not found"});
            }

            const led_1 = result.led_1;
            const led_2 = result.led_2;
            const door = result.door;

            if (led_1 === status) {
                let messtext = 'có bật đâu mà kiu tắt???';
                if (led_1 === 1) {
                    messtext = 'bật rồi mà kiu bật nửa là sao??';
                }
                return res.status(200).json({messages: [{text: messtext}]})
            }

            if (led_1 === 1) {
                let messtext = 'Đã bật đèn phòng khách';
                return res.status(200).json({messages: [{text: messtext}]})
            } else {
                let messtext = 'đèn đã được tắt ạ';

                return res.status(200).json({messages: [{text: messtext}]})
            }

            return res.json({
                led_1,
                led_2,
                door,
            });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({error: "Internal Server Error"});
        }
    },

    updateDataHome: async (req, res, next) => {
        const {led_1, led_2, door} = req.body;
        try {
            const results = await Home.findByIdAndUpdate("656e303ac83ee75dbcc35f26", {
                led_1,
                led_2,
                door
            })
            res.send(results);
        } catch (error) {
            console.log(error.message);
        }
    }


};
