var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//const fileUpload = require('express-fileupload');

//const path = require('path')

var app = express();

//global.assetFolder = '/home/paulsin/assets/';
var globalVariables = require('./globalVariables');

app.use('/backend/assets', express.static(assetFolder));

mongoose.connect('mongodb://localhost/my_db');
//mongoose.connect('mongodb://paulsin:paulpp644@localhost/my_db');

const databasename = "my_db";

const cors = require('cors');

const url = 'http://localhost:3001';  // Localhost
//const url = 'https://haberoceanstock.com/';  // Localhost

const fs = require('fs');

var router = express.Router();

// for parsing application/json
router.use(bodyParser.json()); 

// for parsing application/xwww-
router.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

//router.use(fileUpload());

//console.log(__dirname);
//router.use('/cssFiles', express.static(__dirname + '/assets'));

router.use(cors({
    origin: url, // Replace with your React app's origin
    credentials: true // Allow credentials to be sent
}));

const Property = require('../models/property');

/*
var propertySchema = mongoose.Schema({
    propertyType: String,    
    transactionType: String,
    stateID: String,
    districtID: String,
    townID: String
});

var Property = mongoose.model("Property", propertySchema);
*/

router.get('/', function(req, res) {
    res.send('GET ROUTE ON THINGS PAULSIN');
}); 

router.get('/properties', async function(req, res) {
    try {
        let result = await Property.find();
        res.status(200).json(result);
    } catch (error){
      res.status(500).json(error);
    }
}); 

router.post('/addProperty', async function(req, res) {

    try {
        
        var newProperty = new Property({
            propertyType: req.body.propertyType,    
            transactionType: req.body.transactionType,
            stateID: req.body.stateID,
            districtID: req.body.districtID,
            townID: req.body.townID,
            thumbnailImage : "" 
        });
                        
        //newTest2.save();
                       
        newProperty.save().then(()=> {
            //res.render('show_message.pug', {message: "New person added", type: "success", person: req.body});
            res.sendStatus(200);
        }).catch((err)=> {
            //res.render('show_message.pug', {message: "Database error", type: "error"});
            res.sendStatus(401);
        });
    
        //}
        //res.status(200).json(result);
    } catch (error){
      res.status(500).json(error);
    }
}); 


router.post('/editProperty', async function(req, res) {

    try {
        
        var propertyID = req.body.propertyID;
        var propertyType = req.body.propertyType;
        var transactionType = req.body.transactionType;
        var stateID = req.body.stateID;
        var districtID = req.body.districtID;
        var townID = req.body.townID; 
                        
        //newTest2.save();
        console.log(propertyID)  
        console.log(propertyType) 
        console.log(stateID)  
        console.log(transactionType)  
        console.log(districtID)   
        console.log(townID)       
        let result = await Property.findByIdAndUpdate(req.body.propertyID, {propertyType: req.body.propertyType,transactionType:req.body.transactionType,
            stateID:req.body.stateID,districtID:req.body.districtID,townID:req.body.townID

        })
        // let result1= await Property.findByIdAndUpdate(req.body.propertyID,{stateID:req.body.stateID})
        // ,{transactionType:req.body.transactionType},{stateID:req.body.stateID},{districtID:req.body.districtID},{townID:req.body.townID});
    
        //}
        //res.status(200).json(result);
        res.sendStatus(200);
    } catch (error){
      res.status(500).json(error);
    }
}); 


router.get('/deleteProperty/:id', async function(req, res){
    try {
        const query = { _id: req.params.id };
        let result = await Property.deleteOne(query);

        fs.rm(assetFolder + req.params.id, { recursive: true }, () => console.log('done'));

        res.send(result);
    } catch(error) {
        res.status(500).json(error);
    }
 });


 router.get('/individualProperty/:propertyID', async function(req, res) {
    try {
        let result = await Property.findById(req.params.propertyID);
        res.status(200).json(result);
    } catch (error){
      res.status(500).json(error);
    }
}); 

/*
router.post('/addPropertyImages', async function(req, res) {

    try {
        console.log("A new request received from IMages");                        
        //res.status(200).json(result);

        console.log(req.files);

        const { image } = req.files;
        if (!image) return res.sendStatus(400);

        image.mv(__dirname + '/upload/' + image.name);
    } catch (error){
      res.status(500).json(error);
    }
}); 
*/

module.exports = router;