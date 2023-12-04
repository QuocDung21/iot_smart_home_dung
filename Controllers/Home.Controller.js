const createError = require('http-errors');
const mongoose = require('mongoose');

const Home = require('../Models/Home.model');
const Esp = require("../Models/Esp.model");

module.exports = {
    getDataHome: async (req, res, next) => {
        try {
            const results = await Home.find({}, {__v: 0});
            res.json({
                "led_1" : results.led_1,
                "led_2" : results.led_2,
            })
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
