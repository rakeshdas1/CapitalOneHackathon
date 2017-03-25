var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router(); 

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.render('routes/index');
});

app.post('/submit', function(req, res){
    console.log(req.body);
    res.render('routes/submitted')
});


app.listen(8888);

console.log("Live on http://localhost:8888");