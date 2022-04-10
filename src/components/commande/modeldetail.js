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
    idvendeur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    idplatlib: {
        type: JSON
    },
    prix: {
        type: Number,
        required: true,
        min: 1
    },
    quantite: {
        type: Number,
        required: true,
        min: 1
    },
    status: {
        type: String,
        match: /(EN ATTENTE|A LIVRER|LIVRER|ANNULER)/,
        required: true,
        default: "EN ATTENTE"
    },
});

module.exports = mongoose.model("Detailcommande", commandedetailSchema);