const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: {
        type: String,
        default: "Incomplete" 
    }
});

module.exports = mongoose.model("task", userSchema);
