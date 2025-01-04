var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

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

router.use(cors({
    origin: url, // Replace with your React app's origin
    credentials: true // Allow credentials to be sent
}));

var propertySchema = mongoose.Schema({
    stateID: String,
    districtID: String
});

var Property = mongoose.model("Property", propertySchema);

router.get('/', function(req, res) {
    res.send('GET ROUTE ON THINGS PAULSIN');
}); 

router.post('/addProperty', async function(req, res) {

    try {

            var newState = new State({
                stateName: req.body.stateName,
                stateCode: req.body.stateCode    
            });
                        
            //newTest2.save();
                        
            newState.save().then(()=> {
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

module.exports = router;