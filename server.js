const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/e-kali'));
app.get('/view', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/e-kali/index.html') );
});
app.listen(process.env.PORT || 8080);
