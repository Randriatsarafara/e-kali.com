const mongoose = require("mongoose");

const commandedetailSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    idcommande: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Commande",
        required: true,
    },
    idplat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plat",
        required: true,
    },
    prix: {
        type: Number,
        required: true,
    },
    quantite: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        match: /(A LIVRER|LIVRER|ANNULER)/,
        required: true
    },
});

module.exports = mongoose.model("Detailcommande", commandedetailSchema);