var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
const path = require('path');

var app = express();
var router = express.Router();
var upload = multer();
mongoose.connect('mongodb://localhost/my_db');

app.set('view engine', 'pug');
//app.set('views', './view');
//app.set('views', path.join(__dirname, 'views'));


// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

var personSchema = mongoose.Schema({
    name: String
    //age: Number,
    //nationality: String
 });

 var Person = mongoose.model("Person", personSchema);

router.get('/', function(req, res) {
    res.send('GET ROUTE ON THINGS PAULSIN');
});

router.get('/person', function(req, res){
    res.render('person.pug');
    //res.send("Hello world");
});

router.post('/person', function(req, res){
    var personInfo = req.body; //Get the parsed information
    console.log("A new request received at " + Date.now());
    //res.send("You just called the post method at '/hello'!");


    if(!req.body.name){
        res.render('show_message', {
            message: "Sorry, you provided worng info hello", type: "error"});
    } else {
        var newPerson = new Person({
            name: req.body.name
        });
         
        //newTest2.save();
               
        newPerson.save().then(()=>{
            res.render('show_message', {message: "New person added", type: "success", person: req.body});
        }).catch((err)=>{
            res.render('show_message', {message: "Database error", type: "error"});
        });

    }

});

module.exports = router;