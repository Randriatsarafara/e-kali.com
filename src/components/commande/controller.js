const Commande = require("./model");
const Detailcommande = require("./modeldetail");
const Plat = require("../plat/model");
const User = require("../user/model");
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
        if(!req.body.user || req.body.user===null || req.body.user===undefined || req.body.user===""){
            res.status(401).json({
                error: {
                    message: "Veiller vous connecter"
                }
            })
        } 
        User.findOne({_id:req.body.user}).exec().then((resp)=>{
            commande.userlib = resp;  
            commande.user =req.body.user;
            commande.adresselivraison = commande.userlib.adresse;
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
                    let quant = 0;
                    if(parseInt(response.length)<1){
                        res.status(500).json({
                            error: {
                                message: "Panier vide"
                            }
                        })
                    }
                    for(let i=0;i<response.length;i++){
                        for(let j=0;j<req.body.id.length;j++){
                            if(parseInt(req.body.id[j].quantite)<1){
                                res.status(500).json({
                                    error: {
                                        message: "Etntrer un quantite valide"
                                    }
                                })
                            }
                            if(response[i]._id.equals(mongoose.Types.ObjectId(req.body.id[j].product))){
                                montant += (parseInt(req.body.id[j].quantite)*parseFloat(response[i].prixVente));
                                quant += (parseInt(req.body.id[j].quantite));
                                User.findOne({_id:response[i].user})
                                    .exec().then(async (results) => {
                                        detail.push({prix:response[i].prixVente,idvendeur:response[i].user,idplatlib:{id:response[i]._id,prixAchat:response[i].prixAchat,prixVente:response[i].prixVente,designation:response[i].designation,user:response[i].user,userlib:results},idplat:response[i]._id,quantite:req.body.id[j].quantite});
                                    }).catch(err => {
                                        res.status(500).json({
                                            error: {
                                                message: "Ce produit n'existe plus"
                                            }
                                        })
                                    }) 
                            }
                        }
                    }
                    commande.montant = montant;
                    commande.quantite = quant;
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
        },(err)=>{
            res.status(401).json({
                error: {
                    message: "Veiller vous connecter"
                }
            })
        });
    } catch (error) {
        res.status(500).json({
            error: {
                message: err
            }
        })
    }
    
}
//Valider
module.exports.commandeEnCours = (req, res) => {
    var perPage = req.query.limit ? parseInt(req.query.limit) : 1000,
        page = req.query.page ? Math.max(0, parseInt(req.query.page)) : 1
    const query = {}
    query['status'] = "EN ATTENTE"
    req.query.user ? query['user'] = req.query.user : null
    req.query.prixMin ? query['montant'] = { $gte: req.query.prixMin } : null
    req.query.prixMax ? query['montant'] = { $lte: req.query.prixMax } : null
    
    if (req.query.like) {
        var keysSearchable = ["adresselivraison"]
        var index = req.query.like.split(" ")
        index = index.map(el => el.trim())
        index = index.filter(f => f !== "")
        const orQuery = []
        for (const key of keysSearchable) {
            var subQuery = {}
            subQuery[key] = { $regex: new RegExp(index.join("|"), 'i') }
            orQuery.push(subQuery)
        }
        query['$or'] = orQuery
    }
    Commande.find(query)
        .limit(perPage)
        .skip(perPage * (page - 1))
        .sort(req.query.sort ? req.query.sort : "-createdAt")
        .exec().then(async (results) => {
            const count = await Commande.countDocuments(query).exec()  
            res.status(200).json({
                results,
                count,
                current_page: page,
            })
        }).catch(err => {
            res.status(500).json({ error: err.message })
        }) 
}

//Valider
module.exports.listeDetailCommande = (req, res) => {
    Detailcommande.find({idvendeur:req.body.idvendeur,status:'LIVRER'}).exec().then(async (details) =>{
        res.status(200).json({
            success: {
                message: "Detail du commande "+req.body.idvendeur,
                data: details
            }
        })
    }).catch((err)=>{
        res.status(500).json({ error: "User not found" })
    }); 
}

//En cours
module.exports.commandeAll = (req, res) => {
    var perPage = req.query.limit ? parseInt(req.query.limit) : 10000,
        page = req.query.page ? Math.max(0, parseInt(req.query.page)) : 1
    const query = {}
    req.query.user ? query['user'] = req.query.user : null
    req.query.prixMin ? query['montant'] = { $gte: req.query.prixMin } : null
    req.query.prixMax ? query['montant'] = { $lte: req.query.prixMax } : null
    
    if (req.query.like) {
        var keysSearchable = ["adresselivraison"]
        var index = req.query.like.split(" ")
        index = index.map(el => el.trim())
        index = index.filter(f => f !== "")
        const orQuery = []
        for (const key of keysSearchable) {
            var subQuery = {}
            subQuery[key] = { $regex: new RegExp(index.join("|"), 'i') }
            orQuery.push(subQuery)
        }
        query['$or'] = orQuery
    }
    Commande.find(query)
        .limit(perPage)
        .skip(perPage * (page - 1))
        .sort(req.query.sort ? req.query.sort : "-createdAt")
        .exec().then(async (results) => {
            const count = await Commande.countDocuments(query).exec()  
            res.status(200).json({
                results,
                count,
                current_page: page,
            })
        }).catch(err => {
            res.status(500).json({ error: err.message })
        }) 
}

//Valider
module.exports.listePlatAlivrer = (req, res) => {
    Detailcommande.find().exec().then(async (details) =>{
        res.status(200).json({
            success: {
                message: "Liste des livraison",
                data: details
            }
        })
    }).catch((err)=>{
        res.status(500).json({ error: err })
    }); 
}

//Valider
module.exports.livrerDemande = (req, res) => {
    User.findOne({_id:req.body.livreur}).exec().then(
        (result)=>{
            Commande.updateOne({ _id: req.params.id }, {"livreur":req.body.livreur,"livreurlib":result,"status":req.body.status}).then(result => {
                res.status(200).json({ success: "Update successfull"})
            }).catch(err => {
                res.status(500).json({ error: err.message });
            });
        }
    ).catch(
        (err)=>{
            res.status(500).json({ error: err.message });
        }
    );
}
