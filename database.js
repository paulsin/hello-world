
///////////////////////////////////////////////////////

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db');

app.set('view engine', 'pug');
app.set('views', './views');

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

var test2Schema = mongoose.Schema({
   name: String,
   to: String
});
var test2 = mongoose.model("test2", test2Schema);


app.get('/', function(req, res){
   res.render('form');
});

app.get('/backend/person', function(req, res){
   res.render('person');
});

app.post('/backend/person', function(req, res){
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

app.post('/', function(req, res){
	console.log(req.body);
	//res.send("recieved your request!");
   
	if(!req.body.say || !req.body.to){
		res.render('show_message', {
			message: "Sorry, you provided worng info", type: "error"});
	} else {
		var newTest2 = new test2({
			say: req.body.say,
			to: req.body.to
	});
            
	//newTest2.save();
            
      
      	newTest2.save().then(()=>{
        	res.render('show_message', {message: "New person added", type: "success", person: req.body});
      	}).catch((err)=>{
      		res.render('show_message', {message: "Database error", type: "error"});
      	});
    
   }
   
});	


app.get('/collections', async (req, res) => {
	
	
	
	////////////////  Get all data
	
	try {
  		let result = await test2.find();
  		res.status(200).json(result);
	} catch (error){
		res.status(500).json(error);
	}
	
	
	/////////////////  Get data with conditions
	
	/*
	try {
  		let result = await test2.find({say:"Hi", to: "Express"});
  		res.status(200).json(result);
	} catch (error){
		res.status(500).json(error);
	}
	*/
	
	///////////////  Get data by ID

	/*	
	try {
  		let result = await test2.findById("672795df2dd61c988b072a5a");
  		res.status(200).json(result);	
	} catch (error){
		res.status(500).json(error);
	}
	*/
	
	///////////////  Update by ID
	
	/*
	try {
  		let result = await test2.findByIdAndUpdate("672795df2dd61c988b072a5a", {say:"HelloPaul"});
  		res.status(200).json(result);	
	} catch (error){
		res.status(500).json(error);
	}
	*/
	
	///////////////  Delete by ID
	
	/*
	try {
  		let result = await test2.findByIdAndRemove("672795df2dd61c988b072a5a");
  		res.status(200).json(result);	
	} catch (error){
		res.status(500).json(error);
	}
	*/
	
});

app.listen(3000);
