const createError = require('http-errors');
const mongoose = require('mongoose');

const Home = require('../Models/Home.model');
const Esp = require("../Models/Esp.model");
const {home} = require("nodemon/lib/utils");

module.exports = {
    getDenPhongKhach: async (req, res, next) => {
        const status = req.params.status;
        try {
            const result = await Home.findOne({_id: "656e303ac83ee75dbcc35f26"}, {__v: 0});
            console.log(result)
            if (!result) {
                return res.status(404).json({error: "Data not found"});
            }

            const led_1 = result.led_1;
            const led_2 = result.led_2;
            const door = result.door;

            if (led_1 === parseInt(status)) {
                let messtext = 'Đèn chưa bật mà sao tắt';
                if (led_1 === 1) {
                    messtext = 'Đèn đang bật mà';
                }
                return res.status(200).json({messages: [{text: messtext}]})
            }

            if (parseInt(status) === 1) {
                let messtext = 'Đã bật đèn phòng khách';
                await Home.findByIdAndUpdate(
                    {_id: "656e303ac83ee75dbcc35f26"},
                    {
                        led_1: 1
                    },
                    {
                        new: true
                    }
                );
                return res.status(200).json({messages: [{text: messtext}]})
            } else {
                await Home.findByIdAndUpdate(
                    {_id: "656e303ac83ee75dbcc35f26"},
                    {
                        led_1: 0
                    },
                    {
                        new: true
                    }
                );
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


    getDenPhongNgu: async (req, res, next) => {
        const status = req.params.status;
        try {
            const result = await Home.findOne({_id: "656e303ac83ee75dbcc35f26"}, {__v: 0});
            console.log(result)
            if (!result) {
                return res.status(404).json({error: "Data not found"});
            }

            const led_1 = result.led_1;
            const led_2 = result.led_2;
            const door = result.door;

            if (led_2 === parseInt(status)) {
                let messtext = 'Đèn chưa bật mà sao tắt';
                if (led_2 === 1) {
                    messtext = 'Đèn đang bật mà';
                }
                return res.status(200).json({messages: [{text: messtext}]})
            }

            if (parseInt(status) === 1) {
                let messtext = 'Đã bật đèn phòng khách';
                await Home.findByIdAndUpdate(
                    {_id: "656e303ac83ee75dbcc35f26"},
                    {
                        led_1: 1
                    },
                    {
                        new: true
                    }
                );
                return res.status(200).json({messages: [{text: messtext}]})
            } else {
                await Home.findByIdAndUpdate(
                    {_id: "656e303ac83ee75dbcc35f26"},
                    {
                        led_2: 0
                    },
                    {
                        new: true
                    }
                );
                let messtext = 'đèn đã được tắt ạ';

                return res.status(200).json({messages: [{text: messtext}]})
            }
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
