const Plat = require("./model");
const User = require("../user/model");
const uploadImage = require("../../utilitaire/uploadImage");
const { mongoose } = require("mongoose");

//Attend test
module.exports.allPlat = (req, res) => {
    Plat.find().exec().then(async (plats) =>{
        res.status(200).json({
            success: {
                message: "All plats!",
                data: plats
            }
        })
    }); 
}
//Valider
module.exports.platActif = (req, res) => {
    var perPage = req.query.limit ? parseInt(req.query.limit) : 10,
        page = req.query.page ? Math.max(0, parseInt(req.query.page)) : 1
    const query = {}
    query['status'] = "ACTIF"
    req.query.user ? query['user'] = req.query.user : null
    req.query.prixMin ? query['prixVente'] = { $gte: req.query.prixMin } : null
    req.query.prixMax ? query['prixVente'] = { $lte: req.query.prixMax } : null
    
    if (req.query.like) {
        var keysSearchable = ["designation","description"]
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
    Plat.find(query)
        .limit(perPage)
        .skip(perPage * (page - 1))
        .sort(req.query.sort ? req.query.sort : "-createdAt")
        .exec().then(async (results) => {
            const count = await Plat.countDocuments(query).exec()  
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
module.exports.platByUser = (req, res) => {
    Plat.find({ user: req.params.iduser })
        .exec()
        .then(async (result) => {
            const count = await Plat.countDocuments().exec()
            res.status(200).json({data:result,count:count})
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
}
//Valider
module.exports.platById = (req, res) => {
    Plat.findOne({ _id: req.params.id })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
}

//En cours
module.exports.updateById = (req, res) => {
    console.log(req);
    Plat.updateOne({ _id: req.user.id }, { ...req.body}).then(result => {
        res.status(200).json({
            resultat: result
        })
    }).catch(err => {
        res.status(401).json({
            message: err.message
        })
    })
}

//Attend test
module.exports.visible = (req, res) => {
    Plat.findOne({ _id: req.params.id, user: req.user._id }).exec().then(oldAnnonce => {
        if (!oldAnnonce) return res.status(404).json({ error: "error 404 not found !!!" })
        Plat.findOneAndUpdate({ _id: req.params.id }, { ...oldAnnonce, status:"ACTIF" }).exec().then(() => {
            res.status(200).json({ message: "this item is updated successfully." })
        }).catch(err => {
            res.status(500).json({ error: err.message })
        })
    }).catch(err => {
        res.status(500).json({ error: err.message })
    })
}
//Attend test
module.exports.invisible = (req, res) => {
    Plat.findOne({ _id: req.params.id, user: req.user._id }).exec().then(oldAnnonce => {
        if (!oldAnnonce) return res.status(404).json({ error: "error 404 not found !!!" })
        Plat.findOneAndUpdate({ _id: req.params.id }, { ...oldAnnonce, status:"INACTIF" }).exec().then(() => {
            res.status(200).json({ message: "this item is updated successfully." })
        }).catch(err => {
            res.status(500).json({ error: err.message })
        })
    }).catch(err => {
        res.status(500).json({ error: err.message })
    })
}
//Attend test
module.exports.create = (req, res) => {
    // uploadImage(req, res, async (error) => {
    //     if (req.files.length > 0) {
            // const images = req.files.req.files;
            // build data
            if(req.body.designation==="" || req.body.designation===null || req.body.designation===undefined){
                res.status(500).json({ error: {message : "Designation invalide"} })
            }
            if(req.body.prixVente<=0 || req.body.prixVente===null || req.body.prixVente===undefined){
                res.status(500).json({ error: {message : "Prix vente invalide"} })
            }
            if(req.body.prixAchat<=0 || req.body.prixAchat===null || req.body.prixAchat===undefined){
                res.status(500).json({ error: {message : "Prix achat invalide"} })
            }
            console.log(req.body.user)
            User.findOne({_id:req.body.user})
                .exec().then((results) => {
                    const data = {
                        ...req.body,
                        userlib:results,
                        createdAt: new Date()
                    }
                    const plat = new Plat({ ...data, _id: mongoose.Types.ObjectId() })
                    plat.save().then((result) => {
                        res.status(200).json(result)
                    }).catch(error => {
                        res.status(500).json({ error: {message : error.message} })
                    })
                }).catch(err => {
                    console.log(err)
                }) 
    //     } else {
    //         res.status(500).json({ error })
    //     }
    // })
}
//Valider
module.exports.detailPannier = (req, res) => {
    try {
        let tab = [];
        if(!req.body.id){
            return;
        }
        for(let i=0;i<req.body.id.length;i++){
            tab.push(mongoose.Types.ObjectId(req.body.id[i].product));
        }
        Plat.aggregate([
            {
                $lookup:
                {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "userlib"
                }
            },{
                $match: {
                    "_id" : {
                        "$in": tab
                    }
                } 
            }
        ]).exec().then((response)=>
            {
                res.status(200).json({
                    success: {
                        message: "Detail pannier",
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
module.exports.update = (req, res) => {
    // uploadImage(req, res, async (error) => {
    //     if (req.files.length > 0) {
            // const images = req.files.req.files;
            // build data
            if(req.body.designation==="" || req.body.designation===null || req.body.designation===undefined){
                res.status(500).json({ error: {message : "Designation invalide"} })
            }
            if(req.body.prixVente<=0 || req.body.prixVente===null || req.body.prixVente===undefined){
                res.status(500).json({ error: {message : "Prix vente invalide"} })
            }
            if(req.body.prixAchat<=0 || req.body.prixAchat===null || req.body.prixAchat===undefined){
                res.status(500).json({ error: {message : "Prix achat invalide"} })
            }
            
            // Commande.updateOne({ _id: req.params.id }, {"livreur":req.body.livreur,"livreurlib":result,"status":req.body.status}).then(result => {
            //     res.status(200).json({ success: "Update successfull"})
            // }).catch(err => {
            //     res.status(500).json({ error: err.message });
            // });
        
            // const plat = new Plat({ ...data, _id: mongoose.Types.ObjectId() })
            console.log("DDDDDDDDDD")
            const data = {
                ...req.body,
                createdAt: new Date()
            }
            console.log("id",req.params.id)
            console.log("EEEEEEEEEEEE=",{...data})
            Plat.updateOne({ _id: req.params.id },{...data}).then((result) => {
                console.log("METYYYYYYYYYYYYYy",result);
                res.status(200).json(result)
            }).catch(error => {
                res.status(500).json({ error: {message : error.message} })
            })
    //     } else {
    //         res.status(500).json({ error })
    //     }
    // })
}


//Attend test
module.exports.desactiver = (req, res) => {
    Plat.updateOne({ _id: req.params.id },{"status":"NON ACTIF"}).then((result) => {
        res.status(200).json(result)
    }).catch(error => {
        res.status(500).json({ error: {message : error.message} })
    })
}


module.exports.activer = (req, res) => {
    Plat.updateOne({ _id: req.params.id },{"status":"ACTIF"}).then((result) => {
        res.status(200).json(result)
    }).catch(error => {
        res.status(500).json({ error: {message : error.message} })
    })
}