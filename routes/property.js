var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const path = require('path')

var app = express();

mongoose.connect('mongodb://localhost/my_db');
//mongoose.connect('mongodb://paulsin:paulpp644@localhost/my_db');

const databasename = "my_db";

const cors = require('cors');

const url = 'http://localhost:3001';  // Localhost
//const url = 'https://haberoceanstock.com/';  // Localhost

var router = express.Router();

// for parsing application/json
router.use(bodyParser.json()); 

// for parsing application/xwww-
router.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

router.use(fileUpload());

router.use(express.static(path.join(__dirname, 'public')));

router.use(cors({
    origin: url, // Replace with your React app's origin
    credentials: true // Allow credentials to be sent
}));

var propertySchema = mongoose.Schema({
    propertyType: String,    
    transactionType: String,
    stateID: String,
    districtID: String,
    townID: String
});

var Property = mongoose.model("Property", propertySchema);

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
            townID: req.body.townID 
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

module.exports = router;