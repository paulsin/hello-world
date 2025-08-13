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

const twilio = require("twilio");
const nodemailer = require('nodemailer');


//  For SMS and Whatsapp

const accountSid = "AC7e3fc92aff97de2cf1b9d5c65c0872a8";
const authToken = "3dc2e975e24d6c2b1afb2bd8b944e5ec";
const client = twilio(accountSid, authToken);

const allowedOrigins = [
    'http://localhost:5173',          
    'https://agentfreedeal.com',
    'http://localhost:3001'
  ];
// const url = 'http://192.168.20.2:3000';  // Localhost
//const url = 'https://haberoceanstock.com/';  // Localhost

const fs = require('fs');

var router = express.Router();

// for parsing application/json
router.use(bodyParser.json()); 

// for parsing application/xwww-
router.use(bodyParser.urlencoded({ extended: true })); 

router.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }));

const Agentdiary = require('../models/agentdiary');

router.get('/agentdiaries', async function(req, res) {
    try {
        console.log("hiiiii")
        let result = await Agentdiary.find().sort({dateOperation : -1});;
        res.status(200).json(result);
    } catch (error){
      res.status(500).json(error);
    }
}); 

router.post('/addAgentdiary', async function(req, res) {
  
  

    const date = new Date();
   

    try {
        // if(req.body.propertyType=="Villa")
           console.log("haiii")
            var newAgentdiary = new Agentdiary({
           
                name: req.body.name,    
                phone: req.body.phone,
                range:req.body.range,
                preferedLocation: req.body.preferedLocation,
                dateOperation:  date.getTime(),
                stateID:req.body.stateID,
                districtID:req.body.districtID,
                townID:req.body.townID
        
            });
                        
        //newTest2.save();
                       
        newAgentdiary.save().then(()=> {
            //res.render('show_message.pug', {message: "New person added", type: "success", person: req.body});
            // console.log("saved")
            
           
         
        

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
router.post('/editAgentdiary', async function(req, res) {

  const date = new Date();
  try {
      
      let result = await Agentdiary.findByIdAndUpdate(req.body.id, {name: req.body.name,  phone:req.body.phone,range:req.body.range,
        preferedLocation: req.body.preferedLocation,
        dateOperation:  date.getTime(),
        stateID:req.body.stateID,
        districtID:req.body.districtID,
        townID:req.body.townID
        
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

// router.get('/deleteAgentdiary/:id', async function(req, res){
//   try {
//       const query = { _id: req.params.id };
//       let result = await Agentdiary.deleteOne(query);
//       res.send(result);
//   } catch(error) {
//       res.status(500).json(error);
//   }
// });

router.delete('/deleteAgentdiary/:id', async function (req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid ID format" });
    }

    const query = { _id: req.params.id };
    let result = await Agentdiary.deleteOne(query);

    if (result.deletedCount > 0) {
      res.status(200).json({ success: true, message: "Deleted successfully." });
    } else {
      res.status(404).json({ success: false, message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
});
module.exports = router;

