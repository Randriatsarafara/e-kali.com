const mongoose = require("mongoose");

const commandeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    datecommande: {
        type: Date, required: true
    },
    montant: {
        type: Number,
        required: true,
    },
    quantite: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    userlib: {
        type: JSON
    },
    adresselivraison: String,
    status: {
        type: String,
        match: /(EN ATTENTE|A LIVRER|LIVRER|ANNULER)/,
        required: true,
        default: "EN ATTENTE"
    },
    prixlivraison: {
        type: Number,
        required: true,
        default: 2000.0,
        min: 0
    },
    createdAt: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model("Commande", commandeSchema);