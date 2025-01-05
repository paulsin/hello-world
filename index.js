var express = require('express');
var app = express();
//var cors = require('cors');

var accounts = require('./routes/accounts.js');
var location = require('./routes/location.js');
var property = require('./routes/property.js');

global.databaseURL = 'mongodb://localhost/my_db';

//app.use(cors());

/*
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
});
*/

app.use('/backend/accounts', accounts);
app.use('/backend/location', location);
app.use('/backend/property', property);

app.listen(3000);

/*
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db');


app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded


var personSchema = mongoose.Schema({
        name: String,
        email: String,
        password : String,
        confirmPassword : String,
        mobile : String
   //nationality: String
});
var Person = mongoose.model("Person", personSchema);



app.get('/backend/hello', function(req, res){
   res.send("Hello World! paulsin polachan puliparamban mookkannur");
});

//app.post('/backend/person', function(req, res){
//   res.send("You just called the post method at '/person'!\n");
//});

app.get('/backend/person', function(req, res){
   res.render('person');
});

app.post('/backend/person', function(req, res){
        var personInfo = req.body; //Get the parsed information
        console.log("A new request received at " + Date.now());
        //res.send("You just called the post method at '/hello'!");


        if(!req.body.name){
                res.render('show_message', {
                        message: "Sorry, you provided worng info", type: "error"});
        } else {
                var newPerson = new Person({
                        name: req.body.name,
                        email: req.body.email,
                        password : req.body.password,
                        confirmPassword : req.body.confirmPassword,
                        mobile : req.body.mobile
                });

                //newTest2.save();

        newPerson.save().then(()=>{
                res.render('show_message', {message: "New person added", type: "success", person: req.body});
        }).catch((err)=>{
                res.render('show_message', {message: "Database error", type: "error"});
        });

    }

});



app.listen(3000);

*/

/*


*/