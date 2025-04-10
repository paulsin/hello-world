var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

mongoose.connect('mongodb://localhost/my_db');
//mongoose.connect('mongodb://paulsin:paulpp644@localhost/my_db');

const cors = require('cors');

const url = 'http://localhost:5173';  // Localhost
//const url = 'https://haberoceanstock.com/';  // Localhost


var router = express.Router();

// for parsing application/json
router.use(bodyParser.json()); 

// for parsing application/xwww-
router.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded


router.use(cors({
    origin: url, // Replace with your React app's origin
    credentials: true // Allow credentials to be sent
}));

router.use(cookieParser());
router.use(session({
    secret: 'your_secret_key',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS    
}));

var personSchema = mongoose.Schema({
    name: String,
    email: String,          
    password : String,
    userRole : String,
    mobile : String
 });


 var Person = mongoose.model("Person", personSchema);
 

router.get('/', function(req, res) {
    res.send('GET ROUTE ON THINGS PAULSIN');
}); 

router.get('/person', async function(req, res){
    //res.render('person.pug');
    //res.send("Hello world");

	////////////////  Get all data
	// console.log("DFdxgf")
	try {
        let result = await Person.find();
        //console.log(result)
        res.status(200).json(result);
    } catch (error){
      res.status(500).json(error);
    }

});
   
router.get('/person/:id', async function(req, res){

	////////////////  Get all data
	
	try {
        let result = await Person.find({_id: req.params.id});
        res.status(200).json(result);
    } catch (error){
      res.status(500).json(error);
    }

});

router.get('/setOwner/:id', async function(req, res){

    //localhost:3001/accounts/setOwner/hghhGFFGDF46546@HG565gfg54334
    try {

        if(req.params.id == "hghhGFFGDF46546@HG565gfg54334") {

            let result = await Person.find({email: "ownerpaulsin@gmail.com"});
            //if(result.password == req.params.password) {
            console.log(result.length);
            if(result.length == 0) {
                console.log("Not Exists");
                
                var newPerson = new Person({
                        name: "OWNER OWNER",
                        email: "ownerpaulsin@gmail.com",
                        password : "password",
                        userRole : "owner",
                        mobile : "8281342098"        
                });
                        
                //newTest2.save();
                        
                newPerson.save().then(()=>{
                    //res.render('show_message.pug', {message: "New person added", type: "success", person: req.body});
                    res.sendStatus(200);
                }).catch((err)=>{
                    //res.render('show_message.pug', {message: "Database error", type: "error"});
                    res.sendStatus(401);
                });

            }
            else {
                console.log("Exists");
                res.send("user exists");
            }

        }
        
        //}
        //res.status(200).json(result);
    } catch (error){
      res.status(500).json(error);
    }

});

/*
router.post('/person/login', async function(req, res){

	////////////////  Get all data
	
	try {
        let result = await Person.find({email: req.body.mailOrMobile});
        if(result.length > 0) {
            //console.log(result[0].password);
            console.log(req.body.mailOrMobile);
            if(result[0].password == req.body.password) {
                console.log("Logging successful");
                //if(req.session.username) {
                    req.session.username = "Paulsin";
                    req.session.username = "Paulsin";
                    req.session.save();
                //}
                //else {
                //    req.session.username = "Paulsin";
                //}
                //req.session.password = req.body.password;
                //res.send('logged_in');
                res.json({success: true});
            }
            else {
                console.log("Bad credentails");
                res.send("bad_credentials");
            }
        }
        else {
            console.log("Bad credentails");
            res.send("bad_credentials");
        }
        //res.status(200).json(result);
    } catch (error){
      res.status(500).json(error);
    }

});
*/

router.get('/logInFunction', async function(req, res){

    console.log("In the function");

    console.log(req.query.username);
    console.log(req.query.password);

    //req.session.username = req.query.username;
    //req.session.password = req.query.password;

	try {
        let result = await Person.find({email: req.query.username});
        if(result.length > 0) {
            //console.log(result[0].password);
            //console.log(result[0]._id.toString());
            //var userDBid = result[0]._id.toString();
            if(result[0].password == req.query.password) {
                console.log("Logging successful");
                //if(req.session.username) {
                    req.session.username = req.query.username;
                    req.session.password = req.query.password;
                    req.session.userRole = result[0].userRole;
                    req.session.userID = result[0]._id.toString();
                    //req.session.save();
                //}
                //else {
                //    req.session.username = "Paulsin";
                //}
                //req.session.password = req.body.password;
                res.send('logged_in');
                //res.json({success: true});
            }
            else {
                console.log("Bad credentails");
                res.send('bad_credentials');
            }
        }
        else {
            console.log("Bad credentails");
            res.send("bad_credentials");
        }
        //res.status(200).json(result);
    } catch (error){
      res.status(500).json(error);
    }

    //res.send("Paulsin");
});

router.get('/loggedInUser', async function(req, res){
    //res.render('person.pug');
    //res.send("Hello world");

	////////////////  Get all data
	
	try {
        //console.log(req.session.username);
        if(req.session.username && req.session.password) {
            res.send({username : req.session.username, password : req.session.password, userRole : req.session.userRole, userID : req.session.userID});
        }
        else {
            res.send("not_logged_in");
        }
    } catch (error){
      res.status(500).json(error);
    }

});

router.get('/logoutUser', async function(req, res){
    //res.render('person.pug');
    //res.send("Hello world");

	////////////////  Get all data
	
	req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Failed to destroy session');
        }
        res.send('session_destroyed');
    });

});

router.post('/person/update/', async (req, res) => {
    console.log("A new request received at " + Date.now());

	try {   
        let result = await Person.findByIdAndUpdate(req.body.id, {name: req.body.name, email: req.body.email, 
            mobile: req.body.mobile, password: req.body.password, mobile: req.body.mobile, userRole: req.body.userRole});
        res.send(result); 
    } catch (error) {
        res.status(500).json(error);
    }

    //res.sendStatus(200);
})

router.get('/person/delete/:id', async function(req, res){
    try {
        const query = { _id: req.params.id };
        let result = await Person.deleteOne(query);
        res.send(result);
    } catch(error) {
        res.status(500).json(error);
    }
 });

router.post('/person', async function(req, res){
    var personInfo = req.body; //Get the parsed information
    console.log("A new request received at " + Date.now());
    //res.send("You just called the post method at '/hello'!");
    console.log("A new request received at " + personInfo.name);

    
    try {
        let result = await Person.find({email: req.body.email});
        //if(result.password == req.params.password) {
        console.log(result.length);
        if(result.length == 0) {
            console.log("Not Exists");
            
            var newPerson = new Person({
                    name: req.body.name,
                    email: req.body.email,
                    password : req.body.password,
                    userRole : req.body.userRole,
                    mobile : req.body.mobile        
            });
                    
            //newTest2.save();
                       
            newPerson.save().then(()=>{
                //res.render('show_message.pug', {message: "New person added", type: "success", person: req.body});
                res.sendStatus(200);
            }).catch((err)=>{
                //res.render('show_message.pug', {message: "Database error", type: "error"});
                res.sendStatus(401);
            });

        }
        else {
            console.log("Exists");
            res.send("user exists");
        }
        
        //}
        //res.status(200).json(result);
    } catch (error){
      res.status(500).json(error);
    }
  
});

router.get('/pageCount', function(req, res){
    
    if(req.session.page_views){
       req.session.page_views++;
       res.send("You visited this page " + req.session.page_views + " times");
    } else {
       req.session.page_views = 1;
       res.send("Welcome to this page for the first time!");
    }
       
    //res.send({username : req.session.username});
 });

 


module.exports = router;