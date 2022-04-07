const mongoose = require("mongoose");

const villeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    val: {
        type: String, required: true,unique: true
    },

});

module.exports = mongoose.model("Ville", villeSchema);