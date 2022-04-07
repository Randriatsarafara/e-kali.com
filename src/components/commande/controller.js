const Commande = require("./model");
const Detailcommande = require("./modeldetail");

module.exports.allCommande = (req, res) => {
    Commande.find().exec().then(async (commandes) =>{
        res.status(200).json({
            success: {
                message: "All commandes!",
                data: commandes
            }
        })
    }); 
}

module.exports.detail = (req, res) => {
    Detailcommande.find({idcommande:req.params.idcommande}).exec().then(async (details) =>{
        res.status(200).json({
            success: {
                message: "Detail du commande "+req.params.idcommande,
                data: details
            }
        })
    }); 
}