var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('routes/index');
});


app.listen(8888);

console.log("Live on http://localhost:8888");