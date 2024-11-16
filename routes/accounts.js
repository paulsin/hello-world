var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
const path = require('path');

var app = express();

var upload = multer();
mongoose.connect('mongodb://localhost/my_db');

app.set('view engine', 'pug');
app.set('views', './views');
//app.set('views', path.join(__dirname, 'views'));

var router = express.Router();

// for parsing application/json
router.use(bodyParser.json()); 

// for parsing application/xwww-
router.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));


var personSchema = mongoose.Schema({
    name: String,
    email: String,          
    password : String,
    confirmPassword : String,
    mobile : String
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
    console.log("A new request received at " + personInfo.name);

    if(!req.body.name){
        res.render('show_message', {
           message: "Sorry, you provided worng info hello", type: "error"});
        //console.log("Name exists");
    } else {    
        console.log("Name exists");
        var newPerson = new Person({
            name: req.body.name,
            email: req.body.email,
            password : req.body.password,
            confirmPassword : req.body.confirmPassword,
            mobile : req.body.mobile        
        });
            
        //newTest2.save();
               
        newPerson.save().then(()=>{
            res.render('show_message.pug', {message: "New person added", type: "success", person: req.body});
        }).catch((err)=>{
            res.render('show_message.pug', {message: "Database error", type: "error"});
        });

    }

});

module.exports = router;