const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
        const datetimestamp = Date.now();
        cb(null, datetimestamp + '-' + file.fieldname + '.' + file.originalname.split('.')[file.originalname.split('.').length -1] )
    }
});

const imageFilter = (req, file, callback) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
        callback(null, true);
    } else {
        callback(null, false);
    }
}

const uploadImage = multer({
    storage: storage,
    fileFilter: imageFilter
}).array('images',20);

module.exports = uploadImage;