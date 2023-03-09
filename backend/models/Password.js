const mongoose = require("mongoose");


const passwordSchema = new mongoose.Schema({
    password: {
        type: String,
        trim: true,
        required: true
    },
    score: {
        type: Number
    }    
}, {timestamp: true});
module.exports = mongoose.model("passwords", passwordSchema);
