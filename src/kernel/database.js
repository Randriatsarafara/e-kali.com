const mongoose = require("mongoose");
require('dotenv').config;

var uri = "mongodb+srv://kali:kali@cluster0.suixm.mongodb.net/kali?retryWrites=true&w=majority";
mongoose.connect(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then((e) => {
    console.log("Database is connected successfully !!!");
}).catch(err => {
    console.log(err);
});