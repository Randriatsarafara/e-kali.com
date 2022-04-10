const mongoose = require("mongoose");

const platSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    designation: {
        type: String, 
        required: true
    },
    description: {
        type: String
    },
    prixAchat: {
        type: Number,
        required: true,
    },
    prixVente: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    photo: String,
    status: {
        type: String,
        match: /(ACTIF|PENDING)/,
        required: true,
        default: "ACTIF"
    }
});

module.exports = mongoose.model("Plat", platSchema);