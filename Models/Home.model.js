const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomeSchema = new Schema({
    led_1: {
        type: Number,
        default: 1,
        required: true
    },
    led_2: {
        type: Number,
        default: 1,
        required: true
    },
    door: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const EspModel = mongoose.model('Home', HomeSchema);
module.exports = EspModel;
