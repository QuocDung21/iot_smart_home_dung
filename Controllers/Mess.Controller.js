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
                return res.status(200).json({
                    messages: [{text: messtext}, {
                        attachment: {
                            type: 'image',
                            payload: {
                                url: "https://tutihealth.com/wp-content/uploads/2022/10/meme-vit-cam-dao-4.jpg"
                            }
                        }
                    }]
                })
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
            const led_2 = result.led_2;

            if (led_2 === parseInt(status)) {
                let messtext = 'Đèn chưa bật mà sao tắt';
                if (led_2 === 1) {
                    messtext = 'Đèn đang bật mà';
                }
                return res.status(200).json({
                    messages: [{text: messtext}, {
                        attachment: {
                            type: 'image',
                            payload: {
                                url: "https://tutihealth.com/wp-content/uploads/2022/10/meme-vit-cam-dao-4.jpg"
                            }
                        }
                    }]
                })
            }

            if (parseInt(status) === 1) {
                let messtext = 'Đã bật đèn phòng ngủ';
                await Home.findByIdAndUpdate(
                    {_id: "656e303ac83ee75dbcc35f26"},
                    {
                        led_2: 1
                    },
                    {
                        new: true
                    }
                );
                return {
                    messages: [
                        {text: messtext},
                        {
                            attachment: {
                                type: 'image',
                                payload: {
                                    url: "https://tutihealth.com/wp-content/uploads/2022/10/meme-vit-cam-dao-4.jpg"
                                }
                            }
                        }
                    ]
                }
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

    getNhietDo: async (req, res) => {
        try {
            const results = await Esp.findOne({}).sort({createdAt: -1});
            if (results.temp >= 64) {
                let messtext = 'Cảnh báo nhiệt độ hiện tại cao quá !!  : ' + results.temp + "°C";
                return res.status(200).json({messages: [{text: messtext}]})
            }
            let messtext = 'Nhiệt độ hiện tại là : ' + results.temp + "°C";
            return res.status(200).json({messages: [{text: messtext}]})
        } catch (error) {
            console.log(error.message);
        }
    },


    getDoAm: async (req, res) => {
        try {
            const results = await Esp.findOne({}).sort({createdAt: -1});
            let messtext = 'Độ ẩm hiện tại là : ' + results.humid + "%";
            return res.status(200).json({messages: [{text: messtext}]})
        } catch (error) {
            console.log(error.message);
        }
    },

    getDoor: async (req, res) => {
        const status = req.params.status;
        try {
            const result = await Home.findOne({_id: "656e303ac83ee75dbcc35f26"}, {__v: 0});
            if (result.door === parseInt(status) && parseInt(status) === 90) {
                let messtext = 'Có mở đâu mà đòi đóng !';
                return res.status(200).json({
                    messages: [{text: messtext}, {
                        attachment: {
                            type: 'image',
                            payload: {
                                url: "https://tutihealth.com/wp-content/uploads/2022/10/meme-vit-cam-dao-4.jpg"
                            }
                        }
                    }]
                })
            }

            if (result.door === parseInt(status) && parseInt(status) === 0) {
                let messtext = 'Có đóng đâu mà đòi mở !';
                return res.status(200).json({
                    messages: [{text: messtext}, {
                        attachment: {
                            type: 'image',
                            payload: {
                                url: "https://tutihealth.com/wp-content/uploads/2022/10/meme-vit-cam-dao-4.jpg"
                            }
                        }
                    }]
                })
            }

            if (parseInt(status) === 90) {
                let messtext = 'Đã đóng cửa rồi nhé !';
                const results = await Home.findByIdAndUpdate("656e303ac83ee75dbcc35f26", {
                    door: status
                })
                return res.status(200).json({messages: [{text: messtext}]})
            } else {
                let messtext = 'Đã mở cửa rồi nhé !';
                const results = await Home.findByIdAndUpdate("656e303ac83ee75dbcc35f26", {
                    door: status
                })
                return res.status(200).json({messages: [{text: messtext}]})
            }


        } catch (error) {
            console.log(error.message);
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
