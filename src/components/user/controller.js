const User = require("./model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const config = require('config');
var nodemailer = require('nodemailer');

//Valider
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
                status:200,
                success: {
                    id: result._id,
                    message: "Création du compte terminer",
                    name: result.prenom+" "+result.nom,
                    token
                }
            })
        }).catch(err => {
            let retour = err.message;
            if(err.message.includes("type")){
                retour = "Veiller sélectionner un type d'utilisateur";
            }
            if(err.message.includes("ville")){
                retour = "Veiller sélectionner un ville";
            }
            else if(err.message.includes("email") && err.message.includes("duplicate key")){
                retour = "Ce mail a dejà un compte";
            }
            else if(err.message.includes("numero") && err.message.includes("duplicate key")){
                retour = "Ce numero a dejà un compte";
            }
            else if(err.message.includes("email")){
                retour = "Entrer un mail valide";
            }
            res.status(err.status || 500).json({
                error: {
                    message: retour
                }
            })
        })
    }).catch(err => {
        res.status(err.status || 500).json({ error: { message: err.message } })
    })
}
//Valider
module.exports.login = (req, res) => {
    User.findOne().or([
        { numero: req.body.login ? req.body.login : "" },
        { email: req.body.login ? req.body.login : "" }
    ]).exec().then(user => {
        if (user) {
            bcrypt.compare((req.body.password ? req.body.password : "") + user.nom + user.prenom, user.password)
                .then((result) => {
                    if (result) {
                        const token = jwt.sign({
                            id: user._id,
                            name: user.prenom + " " + user.nom,
                            email: user.email
                        }, config.get('jwt_secret'), {
                            expiresIn: "365d"
                        })
                        if(user.status==="SUPPRIMER"){
                            res.status(401).json({ error: { message: "Veiller contacter le responsable e-kali pour reactiver votre compte" } })
                        }
                        res.status(200).json({
                            success: {
                                message: "Connection effectuée",
                                id: user._id,
                                role: user.role,
                                name: user.prenom + " " + user.nom,
                                token: token,
                                user: user
                            }
                        })
                    } else {
                        res.status(401).json({ error: { message: "Verifier votre mot de passe" } })
                    }
                }).catch(() => {
                    res.status(401).json({ error: { message: "Verifier votre mot de passe" } })
                })
        } else {
            res.status(401).json({ error: { message: "Verifier votre mail ou numero" } })
        }
    }).catch(err => {
        res.status(err.status || 500).json({ error: { message: err.message } })
    })
}
//En cours
module.exports.userById = (req, res) => {
    try {
        User.aggregate([
            {
                $lookup:
                {
                    from: "types",
                    localField: "role",
                    foreignField: "_id",
                    as: "role"
                }
            },{
                $match: {
                    "_id" : mongoose.Types.ObjectId(req.params.iduser)
                } 
            }
        ]).exec().then((response)=>
            {
                res.status(200).json({
                    success: {
                        message: "Utilisateur avec une id "+req.params.iduser,
                        data:response
                    }
                });
            }
        );
    } catch (err) {
        res.status(500).json({
            error: {
                message: "Il y a un probleme"
            }
        });
    }
}
//Attend test
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
//Attend test
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
//Attend test
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

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ekali.send.mail@gmail.com',
      pass: 'vfvuindntfzqpdbu'
    }
});
//Valider
module.exports.sendMail = (req, res) => {
    const mailOptions = {
        from: req.body.clientmail,
        to: 'ekali.send.mail@gmail.com',
        subject: req.body.subject,
        text: 
        `
        ${req.body.message}
        
        
        Nom : ${req.body.name}
        Numero : ${req.body.numero}
        E-mail : ${req.body.clientmail}
        `
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.status(401).json({
                error: {
                    message: error
                }
            })
        } else {
            res.status(200).json({
                success: {
                    message: "Mail envoyer"
                }
            })
        }
    });
}

module.exports.userAll = (req, res) => {
    try {
        User.aggregate([
            {
                $lookup:
                {
                    from: "types",
                    localField: "role",
                    foreignField: "_id",
                    as: "rolelib"
                },
            },
            {
                $lookup:
                {
                    from: "villes",
                    localField: "ville",
                    foreignField: "_id",
                    as: "villelib"
                },
            }
        ]).exec().then((response)=>
            {
                res.status(200).json({
                    success: {
                        message: "Toute les utilisateurs",
                        data:response
                    }
                });
            }
        );
    } catch (err) {
        res.status(500).json({
            error: {
                message: "Il y a un probleme"
            }
        });
    }
}

  
  
  
  