const Type = require("./model");

//Valider
module.exports.allType = (req, res) => {
    Type.find().exec().then(async (types) =>{
        res.status(200).json({
            success: {
                message: "All types!",
                data: types
            }
        })
    }); 
}