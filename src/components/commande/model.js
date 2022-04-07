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
    adresselivraison: String,
    status: {
        type: String,
        match: /(A LIVRER|LIVRER|ANNULER)/,
        required: true
    },
    prixlivraison: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Commande", commandeSchema);