const User = require("./model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const config = require('config');

module.exports.create = (req, res) => {
    bcrypt.hash(req.body.password + req.body.nom + req.body.prenom, 10).then(async (hash) => {
        const user = new User({
            ...req.body,
            createdAt: new Date().toISOString().split("T")[0],
            password: hash,
            _id: mongoose.Types.ObjectId()
        });
        user.save().then((result) => {
            const token = jwt.sign({
                id: result._id,
                name: result.prenom+" "+result.nom,
                email: result.email
            }, config.get('jwt_secret'), {
                expiresIn: "365d"
            })
            res.status(201).json({
                success: {
                    id: result._id,
                    message: "Création du compte terminer",
                    name: result.prenom+" "+result.nom,
                    token
                }
            })
        }).catch(err => {
            res.status(err.status || 500).json({
                error: {
                    message: err.message
                }
            })
        })
    }).catch(err => {
        res.status(err.status || 500).json({ error: { message: err.message } })
    })
}

module.exports.login = (req, res) => {
    User.findOne().or([
        { numero: req.body.numero ? req.body.numero : "" },
        { email: req.body.email ? req.body.email : "" }
    ]).exec().then(user => {
        if (user) {
            bcrypt.compare((req.body.password ? req.body.password : "") + user.nom, user.password)
                .then((result) => {
                    if (result) {
                        const token = jwt.sign({
                            id: user._id,
                            nom: user.nom,
                            email: user.email
                        }, config.get('jwt_secret'), {
                            expiresIn: "365d"
                        })
                        res.status(200).json({
                            success: {
                                message: "logging successful.",
                                id: user._id,
                                nom: user.nom,
                                role: user.role,
                                name: user.prenom + " " + user.nom,
                                token: token,
                                user: user
                            }
                        })
                    } else {
                        res.status(401).json({ error: { message: "Wrong password 1." } })
                    }
                }).catch(() => {
                    res.status(401).json({ error: { message: "Wrong password 2." } })
                })
        } else {
            res.status(401).json({ error: { message: "username or email not found." } })
        }
    }).catch(err => {
        res.status(err.status || 500).json({ error: err.message })
    })
}

module.exports.allUser = (req, res) => {
    User.find().exec().then(async (user) =>{
        res.status(200).json({
            success: {
                message: "All users!",
                data: user
            }
        })
    })  
}

module.exports.allResto = (req, res) => {
    User.find({role:"resto"}).exec().then(async (user) =>{
        res.status(200).json({
            success: {
                message: "All resto!",
                data: user
            }
        })
    })  
}

module.exports.allLivreur = (req, res) => {
    User.find({role:"livreur"}).exec().then(async (user) =>{
        res.status(200).json({
            success: {
                message: "All livreur!",
                data: user
            }
        })
    })  
}