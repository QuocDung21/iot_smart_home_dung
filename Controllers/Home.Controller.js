const createError = require('http-errors');
const mongoose = require('mongoose');

const Home = require('../Models/Home.model');
const Esp = require("../Models/Esp.model");
const sendEmail = require("../Mail/mail");
module.exports = {
    getDataHome: async (req, res, next) => {
        try {
            const result = await Home.findOne({ _id: "656e303ac83ee75dbcc35f26" }, { __v: 0 });
            console.log(result)
            if (!result) {
                return res.status(404).json({ error: "Data not found" });
            }




            const led_1 = result.led_1;
            const led_2 = result.led_2;
            const door = result.door;

            return res.json({
                led_1,
                led_2,
                door,
            });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },

    updateDataHome: async (req, res, next) => {
        const {led_1, led_2, door} = req.body;
        try {
            const results = await Home.findByIdAndUpdate("656e303ac83ee75dbcc35f26", {
                led_1,
                led_2
            })
            res.send(results);
        } catch (error) {
            console.log(error.message);
        }
    }


};
