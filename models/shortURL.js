const mongoose = require('mongoose');
const nanoid = require('nanoid');
const shortURLSchema = new mongoose.Schema({
    full: {
        type:String,
        required: true
    },
    short: {
        type:String,
        required: true,
        default: () => nanoid.nanoid(8)
    },
    clicks:{
        type:Number,
        required: true,
        default: 0
    }
})

module.exports= mongoose.model('ShortUrl', shortURLSchema);