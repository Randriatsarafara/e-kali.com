const jwt = require("jsonwebtoken");
const config = require('config');
const User = require("../components/user/model");

module.exports.checkAuthClient = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, config.get('jwt_secret'));
        User.findById(decode.id).exec().then(result => {
            if (!result) {
                return res.status(401).json({
                    error: {
                        message: "Veuillez vous connecter!",
                    }
                });
            }
            req.user = result;
            next();
        }).catch(err => {
            res.status(500).json({ error: err.message});
        });
    } catch (error) {
        return res.status(401).json({
            error: {
                message: "Accés refusé!"
            },
        });
    }
}

module.exports.checkAuthRestaurant = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, config.get('jwt_secret'));
        User.findById(decode.id).exec().then(result => {
            if (!result) {
                return res.status(401).json({
                    error: {
                        message: "Veuillez vous connecter!",
                    }
                });
            } else {
                if ( (result.role == 'resto')){
                    req.user = result;
                    next();
                }
                else{
                    res.status(401).json({
                        message: "Votre profil n'êtes pas un restaurant!"
                    })
                }
            }
            
        }).catch(err => {
            res.status(500).json({ error: err.message});
        });
    } catch (error) {
        return res.status(401).json({
            error: {
                message: "Accés refusé!",
            }
        });
    }
}

module.exports.checkAuthResponsable = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, config.get('jwt_secret'));
        User.findById(decode.id).exec().then(result => {
            if (!result) {
                return res.status(401).json({
                    error: {
                        message: "Veuillez vous connecter!",
                    }
                });
            } else {
                if (result.role == 'responsable'){
                    req.user = result;
                    next();
                }
                else{
                    res.status(401).json({
                        message: "Votre profil n'êtes pas un responsable!"
                    })
                }
            }
            
        }).catch(err => {
            res.status(500).json({ error: err.message});
        });
    } catch (error) {
        return res.status(401).json({
            error: {
                message: "Accés refusé!",
            }
        });
    }
}

module.exports.checkAuthLivreur = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, config.get('jwt_secret'));
        User.findById(decode.id).exec().then(result => {
            if (!result) {
                return res.status(401).json({
                    error: {
                        message: "Veuillez vous connecter!",
                    }
                });
            } else {
                if (result.role == 'livreur'){
                    req.user = result;
                    next();
                }
                else{
                    res.status(401).json({
                        message: "Votre profil n'êtes pas un livreur!"
                    })
                }
            }
            
        }).catch(err => {
            res.status(500).json({ error: err.message});
        });
    } catch (error) {
        return res.status(401).json({
            error: {
                message: "Accés refusé!",
            }
        });
    }
}