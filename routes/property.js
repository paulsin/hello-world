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
const OwnerOrBuilder = require('../models/ownerOrBuilder');

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
    // console.log(req.body.locality)
    // console.log(req.body.cost)
    // console.log(req.body.facing)
    // console.log(req.body.numberOfFloors)
    // console.log(req.body.builtArea)
    // console.log(req.body.plotArea)
    // console.log(req.body.totalVillas)
    // console.log(req.body.bedrooms)
    // console.log(req.body.bedroomsWithToilet)
    // console.log(req.body.toilets)
    // console.log(req.body.carParking)
   // console.log(req.body.carPorch)
    // console.log(req.body.floorNumber)
    // console.log(req.body.sitout)
    // console.log(req.body.livingArea)
    // console.log(req.body.diningHall)
    // console.log(req.body.kitchen)
    // console.log(req.body.workArea)
    // console.log(req.body.upperLivingArea)
    // console.log(req.body.balcony)
    // console.log(req.body.openTerrace)
    // console.log(req.body.waterWell)
    // console.log(req.body.googleMap)
    // console.log(req.body.youtubeVideoLink)
    // console.log(req.body.propertyTitle)
    // console.log(req.body.propertyFeature1)
    // console.log(req.body.propertyFeature2)
    // console.log(req.body.propertyFeature3)
    // console.log(req.body.propertyFeature4)
    // console.log(req.body.costType)

    try {
        // if(req.body.propertyType=="Villa")
           console.log("haiii")
            var newProperty = new Property({
                propertyType: req.body.propertyType,    
                transactionType: req.body.transactionType,
                stateID: req.body.stateID,
                districtID: req.body.districtID,
                townID: req.body.townID,
                thumbnailImage : "" ,
                locality:req.body.locality,
                cost:req.body.cost,
                costType:req.body.costType,
                facing:req.body.facing,
                numberOfFloors:req.body.numberOfFloors,
                builtArea:req.body.builtArea,
                plotArea:req.body.plotArea,
                totalVillas:req.body.totalVillas,
                floorNumber:req.body.floorNumber,
                bedrooms:req.body.bedrooms,
                bedroomsWithToilet :req.body.bedroomsWithToilet,
                toilets:req.body.toilets,
                carPorch:req.body.carPorch,
                carParking:req.body.carParking,
                sitout:req.body.sitout,
                livingArea:req.body.livingArea,
                diningHall:req.body.diningHall,
                kitchen:req.body.kitchen,
                workArea:req.body.workArea,
                upperLivingArea:req.body.upperLivingArea,
                balcony:req.body.balcony,
                openTerrace:req.body.openTerrace,
                waterWell:req.body.waterWell,
                waterConnection:req.body.waterConnection,
                googleMap:req.body.googleMap,
                youtubeVideoLink:req.body.youtubeVideoLink,
                propertyTitle:req.body.propertyTitle,
                propertyFeature1:req.body.propertyFeature1,
                propertyFeature2:req.body.propertyFeature2,
                propertyFeature3:req.body.propertyFeature3,
                propertyFeature4:req.body.propertyFeature4

            });
                        
        //newTest2.save();
                       
        newProperty.save().then(()=> {
            //res.render('show_message.pug', {message: "New person added", type: "success", person: req.body});
            console.log("saved")
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
        
   

        // console.log(req.body.costType)  
        var propertyID = req.body.propertyID;
        var propertyType = req.body.propertyType;
        var transactionType = req.body.transactionType;
        var stateID = req.body.stateID;
        var districtID = req.body.districtID;
        var townID = req.body.townID; 

        var locality=req.body.locality;
        var cost=req.body.cost;
        var costType=req.body.costType;
        var facing = req.body.facing;
        var numberOfFloors = req.body.numberOfFloors;
        var builtArea = req.body.builtArea;
        var plotArea = req.body.plotArea;
        var totalVillas = req.body.totalVillas;
        var floorNumber = req.body.floorNumber; 
        var bedrooms = req.body.bedrooms;
        var bedroomWithToilet = req.body.bedroomsWithToilet;
        var toilets = req.body.toilets;
        var carPorch=req.body.carPorch;
        var carParking = req.body.carParking;
        var sitout=req.body.sitout;
        var  livingArea=req.body.livingArea;
        var diningHall=req.body.diningHall;
        var kitchen=req.body.kitchen;
        var workArea=req.body.workArea;
        var upperLivingArea=req.body.upperLivingArea;
        var balcony=req.body.balcony;
        var openTerrace=req.body.openTerrace;
        var waterWell=req.body.waterWell;
        var waterConnection=req.body.waterConnection;
        var googleMap=req.body.googleMap;
        var youtubeVideoLink=req.body.youtubeVideoLink;
        var propertyTitle=req.body.propertyTitle;
        var propertyFeature1=req.body.propertyFeature1;
        var propertyFeature2=req.body.propertyFeature2;
        var propertyFeature3=req.body.propertyFeature3;
        var propertyFeature4=req.body.propertyFeature4
        // var districtID = req.body.districtID;
        // var townID = req.body.townID; 
        
                        
        //newTest2.save();
        // console.log(propertyID)  
        // console.log(propertyType) 
        // console.log(stateID)  
        // console.log(transactionType)  
        // console.log(districtID)   
        // console.log(townID)   
        // console.log(locality) 
         // console.log(req.body.floorNumber)   
        // console.log(carPorch)
        //  console.log(sitout)
        //  console.log(livingArea)
        //  console.log(diningHall)
        //  console.log(kitchen)
        //  console.log(workArea)
        //  console.log(upperLivingArea)
        //  console.log(balcony)
        //  console.log(openTerrace)
        //  console.log(waterWell)
        //  console.log(waterConnection)
        // console.log(costType)
        // console.log(googleMap)
        // console.log(youtubeVideoLink)
        // console.log(propertyTitle)
        // console.log(propertyFeature1)
        // console.log(propertyFeature2)
        // console.log(propertyFeature3)
        // console.log(propertyFeature4)
        let result = await Property.findByIdAndUpdate(req.body.propertyID, {propertyType: req.body.propertyType,transactionType:req.body.transactionType,
            stateID:req.body.stateID,districtID:req.body.districtID,townID:req.body.townID,locality:req.body.locality,cost:req.body.cost,costType:req.body.costType,facing:req.body.facing,
            numberOfFloors:req.body.numberOfFloors,builtArea:req.body.builtArea,plotArea:req.body.plotArea,totalVillas: req.body.totalVillas,floorNumber: req.body.floorNumber,
            bedrooms:req.body.bedrooms,bedroomWithToilet:req.body.bedroomsWithToilet,toilets:req.body.toilets,carPorch:req.body.carPorch,
            carParking:req.body.carParking,sitout:req.body.sitout,livingArea:req.body.livingArea,diningHall:req.body.diningHall,kitchen:req.body.kitchen,
            workArea:req.body.workArea,upperLivingArea:req.body.upperLivingArea,balcony:req.body.balcony,openTerrace:req.body.openTerrace,waterWell:req.body.waterWell,
            waterConnection:req.body.waterConnection,googleMap:req.body.googleMap,youtubeVideoLink:req.body.youtubeVideoLink,propertyTitle:req.body.propertyTitle,
            propertyFeature1:req.body.propertyFeature1,propertyFeature2:req.body.propertyFeature2,propertyFeature3:req.body.propertyFeature3,propertyFeature4:req.body.propertyFeature4

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


router.get('/ownersandbuilders', async function(req, res) {
    try {
        let result = await OwnerOrBuilder.find();
        res.status(200).json(result);
    } catch (error){
      res.status(500).json(error);
    }
}); 


router.post('/addOwnerOrBuilder', async function(req, res) {
    // console.log(req.body.locality)
    // console.log(req.body.cost)
    // console.log(req.body.facing)

    try {
        // if(req.body.propertyType=="Villa")
           console.log("haiii")
            var newOwnerOrBuilder = new OwnerOrBuilder({
                contactNumber: req.body.contactNumber,    
                secondNumber: req.body.secondNumber,
                ownerOrBuilder: req.body.ownerOrBuilder,
                name: req.body.name,
                address: req.body.address,
            });
                        
        //newTest2.save();
                       
        newOwnerOrBuilder.save().then(()=> {
            //res.render('show_message.pug', {message: "New person added", type: "success", person: req.body});
            console.log("saved")
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