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
            console.log(result)
            if (!result) {
                return res.status(401).json({
                    error: {
                        message: "Veuillez vous connecter!",
                    }
                });
            } else {
                if ( (result.role == '624faee393fc20f662af744b')){
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
            console.log(result)
            if (!result) {
                return res.status(401).json({
                    error: {
                        message: "Veuillez vous connecter!",
                    }
                });
            } else {
                if (result.role == '624faf1393fc20f662af744f'){
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
                if (result.role == '624faf0893fc20f662af744e'){
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