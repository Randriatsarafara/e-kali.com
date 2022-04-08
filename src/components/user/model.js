const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nom: {
        type: String, required: true
    },
    prenom: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    adresse: {
        type: String,
    },
    numero: {
        type: String,
        unique: true
    },
    photo: String,
    password: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    ville: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ville" 
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Type" 
    },
    status: {
        type: String,
        match: /(ACTIVER|NON ACTIVER|SUPPRIMER)/,
        required: true,
        default : "NON ACTIVER"
    },
});

module.exports = mongoose.model("User", userSchema)