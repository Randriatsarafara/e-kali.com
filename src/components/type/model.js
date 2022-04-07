const mongoose = require("mongoose");

const typeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    designation: {
        type: String, required: true,unique: true
    },
});

module.exports = mongoose.model("Type", typeSchema);