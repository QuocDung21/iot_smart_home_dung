const createError = require('http-errors');
const mongoose = require('mongoose');

const Esp = require('../Models/Esp.model');

module.exports = {
    // getAllProducts: async (req, res, next) => {
    //     try {
    //         const results = await Product.find({}, {__v: 0});
    //         // const results = await Product.find({}, { name: 1, price: 1, _id: 0 });
    //         // const results = await Product.find({ price: 699 }, {});
    //         res.send(results);
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // },

    createEsp: async (req, res, next) => {
        try {
            const {temp, humid, chuyendong, door} = req.body;
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
