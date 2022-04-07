const Ville = require("./model");

module.exports.allVille = (req, res) => {
    Ville.find().exec().then(async (ville) =>{
        res.status(200).json({
            success: {
                message: "All villes!",
                data: ville
            }
        })
    }); 
}