const Commande = require("./model");
const Detailcommande = require("./modeldetail");
const Plat = require("../plat/model");
const { default: mongoose } = require("mongoose");
//Attend test
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
//Attend test
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
//Valider
const newcommande = (data) =>{
    const commande = new Commande({
        ...data,
        createdAt: new Date().toISOString(),
        datecommande: new Date().toISOString().split("T")[0],
        _id: mongoose.Types.ObjectId()
    });
    return commande.save();
}
//Valider
const newdetailcommande = (data,idcommande) =>{
    const detailcommande = new Detailcommande({
        ...data,
        idcommande: idcommande,
        _id: mongoose.Types.ObjectId()
    });
    return detailcommande.save();
}
//Valider
module.exports.create = (req, res) => {
    try {
        let commande = {};
        console.log(req.body)
        if(!req.body.user || req.body.user===null || req.body.user===undefined || req.body.user===""){
            res.status(401).json({
                error: {
                    message: "Veiller vous connecter"
                }
            })
        } 
        commande.user =req.body.user;
        commande.adresselivraison = "Ze tiako";
        commande.prixlivraison = 2000;
        let tab = [];
        if(!req.body.id){
            return;
        }
        for(let i=0;i<req.body.id.length;i++){
            tab.push(mongoose.Types.ObjectId(req.body.id[i].product));
        }
        Plat.aggregate([{
                $match: {
                    "_id" : {
                        "$in": tab
                    }
                } 
            }
        ]).exec().then((response)=>
            {
                let detail = [];
                let montant = 0;
                for(let i=0;i<response.length;i++){
                    for(let j=0;j<req.body.id.length;j++){
                        if(response[i]._id.equals(mongoose.Types.ObjectId(req.body.id[j].product))){
                            montant += (parseInt(req.body.id[j].quantite)*parseFloat(response[i].prixVente));
                            detail.push({prix:response[i].prixVente,idplat:response[i]._id,quantite:req.body.id[j].quantite});
                        }
                    }
                }
                commande.montant = montant;
                newcommande(commande).then((resp)=>{
                    for(let i=0;i<detail.length;i++){
                        newdetailcommande(detail[i],resp._id);
                    }
                    res.status(200).json({
                        success: {
                            message: "Commande éffectuée"
                        }
                    })
                }).catch((err)=>{
                    res.status(500).json({
                        error: {
                            message: err
                        }
                    })
                });
            }
        );
    } catch (error) {
        res.status(500).json({
            error: {
                message: err
            }
        })
    }
    
}