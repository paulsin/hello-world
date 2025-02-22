var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/my_db');

const cors = require('cors');

//const url = 'http://localhost:3001';  // Localhost
const url = 'https://agentfreedeal.com/';  // Localhost

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

var stateSchema = mongoose.Schema({
    stateName: String,
    stateCode: String
 });

 var districtSchema = mongoose.Schema({
    stateID: String,
    districtName: String,
    districtCode: String
 });

 var townSchema = mongoose.Schema({
    stateID: String,
    districtID: String,
    townName: String,
    townCode: String
 });

 var State = mongoose.model("State", stateSchema);
 var District = mongoose.model("District", districtSchema);
 var Town = mongoose.model("Town", townSchema);

 router.get('/', function(req, res) {
    res.send('GET ROUTE ON THINGS PAULSIN');
}); 

router.post('/state', async function(req, res) {
    var personInfo = req.body; //Get the parsed information
    console.log("A new request received at " + Date.now());
    //res.send("You just called the post method at '/hello'!");
    console.log("A new request received at " + personInfo.name);

    try {

        let result1 = await State.find({stateName: req.body.stateName});
        let result2 = await State.find({stateCode: req.body.stateCode});

        console.log(result2.length);

        if(result1.length == 0 && result2.length == 0) {

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
        }
        else if(result1.length > 0 && result2.length > 0) {
            res.send("both_exists");
        }
        else if(result1.length > 0) {
            res.send("name_exists");
        }
        else if(result2.length > 0) {
            res.send("code_exists");
        }

    
        //}
        //res.status(200).json(result);
    } catch (error){
      res.status(500).json(error);
    }
}); 

router.get('/states', async function(req, res){
    //res.render('person.pug');
    //res.send("Hello world");

	////////////////  Get all data
	
	try {
        let result = await State.find();
        res.status(200).json(result);
    } catch (error){
      res.status(500).json(error);
    }

});

router.post('/updateState/:id', async (req, res) => {
/*
	try {   
        let result = await State.findByIdAndUpdate(req.params.id, {stateName: req.body.stateName, stateCode: req.body.stateCode});
        res.send(result); 
    } catch (error) {
        res.status(500).json(error);
    }
*/
    //res.sendStatus(200);

    var result1Length = 0;
    var result2Length = 0;

    try {

        let result1 = await State.find({stateName: req.body.stateName});
        let result2 = await State.find({stateCode: req.body.stateCode});

        result1.forEach(element => {
            if(element._id != req.params.id) {
                //console.log(result2.length);
                result1Length++;
            }
        });

        result2.forEach(element => {
            if(element._id != req.params.id) {
                //console.log(result2.length);
                result2Length++;
            }
        });

        //console.log(result2.length);

        if(result1.length == 0) {
                        
            let result = await State.findByIdAndUpdate(req.params.id, {stateName: req.body.stateName});
            //res.send(result);
        }

        if(result2.length == 0) {
                        
            let result = await State.findByIdAndUpdate(req.params.id, {stateCode: req.body.stateCode});
            //res.send(result);
        }
        
        if(result1Length > 0 && result2Length > 0) {
            res.send("both_exists");
        }
        else if(result1Length > 0) {
            res.send("name_exists");
        }
        else if(result2Length > 0) {
            res.send("code_exists");
        }
        else {
            res.sendStatus(200);
        }

    
        //}
        //res.status(200).json(result);
    } catch (error){
      res.status(500).json(error);
    }

});

router.post('/updateDistrict/:id', async (req, res) => {
    /*
        try {   
            let result = await State.findByIdAndUpdate(req.params.id, {stateName: req.body.stateName, stateCode: req.body.stateCode});
            res.send(result); 
        } catch (error) {
            res.status(500).json(error);
        }
    */
        //res.sendStatus(200);
    
        var result1Length = 0;
        var result2Length = 0;
    
        try {
    
            let result1 = await District.find({districtName: req.body.districtName}, {stateID: req.body.stateID});
            let result2 = await District.find({districtCode: req.body.districtCode}, {stateID: req.body.stateID});
    
            result1.forEach(element => {
                if(element._id != req.params.id) {
                    //console.log(result2.length);
                    result1Length++;
                }
            });
    
            result2.forEach(element => {
                if(element._id != req.params.id) {
                    //console.log(result2.length);
                    result2Length++;
                }
            });
    
            //console.log(result2.length);
    
            if(result1.length == 0) {
                            
                let result = await District.findByIdAndUpdate(req.params.id, {districtName: req.body.districtName});
                //res.send(result);
            }
    
            if(result2.length == 0) {
                            
                let result = await District.findByIdAndUpdate(req.params.id, {districtCode: req.body.districtCode});
                //res.send(result);
            }
            
            if(result1Length > 0 && result2Length > 0) {
                res.send("both_exists");
            }
            else if(result1Length > 0) {
                res.send("name_exists");
            }
            else if(result2Length > 0) {
                res.send("code_exists");
            }
            else {
                res.sendStatus(200);
            }
    
        
            //}
            //res.status(200).json(result);
        } catch (error){
          res.status(500).json(error);
        }
    
    });

    router.post('/updateTown/:id', async (req, res) => {
        
            var result1Length = 0;
            var result2Length = 0;
        
            try {
        
                let result1 = await Town.find({townName: req.body.townName}, {stateID: req.body.stateID}, {districtID: req.body.districtID});
                let result2 = await Town.find({townCode: req.body.townCode}, {stateID: req.body.stateID}, {districtID: req.body.districtID});
        
                result1.forEach(element => {
                    if(element._id != req.params.id) {
                        //console.log(result2.length);
                        result1Length++;
                    }
                });
        
                result2.forEach(element => {
                    if(element._id != req.params.id) {
                        //console.log(result2.length);
                        result2Length++;
                    }
                });
        
                //console.log(result2.length);
        
                if(result1.length == 0) {
                                
                    let result = await Town.findByIdAndUpdate(req.params.id, {townName: req.body.townName});
                    //res.send(result);
                }
        
                if(result2.length == 0) {
                                
                    let result = await Town.findByIdAndUpdate(req.params.id, {townCode: req.body.townCode});
                    //res.send(result);
                }
                
                if(result1Length > 0 && result2Length > 0) {
                    res.send("both_exists");
                }
                else if(result1Length > 0) {
                    res.send("name_exists");
                }
                else if(result2Length > 0) {
                    res.send("code_exists");
                }
                else {
                    res.sendStatus(200);
                }
        
            
                //}
                //res.status(200).json(result);
            } catch (error){
              res.status(500).json(error);
            }
        
        });

router.get('/deleteState/:id', async function(req, res){
    try {
        const query = { _id: req.params.id };
        const districtsDeleteQuery = { stateID: req.params.id };
        let result = await State.deleteOne(query);
        let result2 = await District.deleteMany(districtsDeleteQuery);
        res.send(result);
    } catch(error) {
        res.status(500).json(error);
    }
 });


 router.get('/deleteDistrict/:id', async function(req, res){
    try {

        console.log("A new request received at");

        const query = { _id: req.params.id };
        let result = await District.deleteOne(query);
        res.send(result);
    } catch(error) {
        res.status(500).json(error);
    }
 });

 router.get('/deleteTown/:id', async function(req, res){
    try {

        console.log("A new request received at");

        const query = { _id: req.params.id };
        let result = await Town.deleteOne(query);
        res.send(result);
    } catch(error) {
        res.status(500).json(error);
    }
 });

router.post('/district', async function(req, res) {

    try {

        let result1 = await District.find({
            $and: [
              {stateID: req.body.stateID},
              {districtName: req.body.districtName}
            ]
          });

          let result2 = await District.find({
            $and: [
              {stateID: req.body.stateID},
              {districtCode: req.body.districtCode}
            ]
          });

        console.log("Not Exists");
            
        if(result1.length == 0 && result2.length == 0) {

            var newDistrict = new District({
                    stateID: req.body.stateID,
                    districtName: req.body.districtName,
                    districtCode: req.body.districtCode    
            });
                        
            //newTest2.save();
                        
            newDistrict.save().then(()=> {
                //res.render('show_message.pug', {message: "New person added", type: "success", person: req.body});
                res.sendStatus(200);
            }).catch((err)=>{
                //res.render('show_message.pug', {message: "Database error", type: "error"});
                res.sendStatus(401);
            });

        }
        else if(result1.length > 0 && result2.length > 0) {
            res.send("both_exists");
        }
        else if(result1.length > 0) {
            res.send("name_exists");
        }
        else if(result2.length > 0) {
            res.send("code_exists");
        }
    
        //}
        //res.status(200).json(result);
    } catch (error){
      res.status(500).json(error);
    }
}); 

router.get('/districts', async function(req, res){
    //res.render('person.pug');
    //res.send("Hello world");

	////////////////  Get all data
	
	try {
        let result = await District.find();
        res.status(200).json(result);
    } catch (error){
        res.status(500).json(error);
    }

});

router.post('/town', async function(req, res) {

    try {

        let result1 = await Town.find({
            $and: [
              {stateID: req.body.stateID},
              {districtID: req.body.districtID},
              {townName: req.body.townName}
            ]
          });

          let result2 = await District.find({
            $and: [
              {stateID: req.body.stateID},
              {districtID: req.body.districtID},
              {townCode: req.body.townCode}
            ]
          });

        console.log("Not Exists");
            
        if(result1.length == 0 && result2.length == 0) {

            var newTown = new Town({
                    stateID: req.body.stateID,
                    districtID: req.body.districtID,
                    townName: req.body.townName,
                    townCode: req.body.townCode    
            });
                        
            //newTest2.save();
                        
            newTown.save().then(()=> {
                //res.render('show_message.pug', {message: "New person added", type: "success", person: req.body});
                res.sendStatus(200);
            }).catch((err)=>{
                //res.render('show_message.pug', {message: "Database error", type: "error"});
                res.sendStatus(401);
            });
        }
        else if(result1.length > 0 && result2.length > 0) {
            res.send("both_exists");
        }
        else if(result1.length > 0) {
            res.send("name_exists");
        }
        else if(result2.length > 0) {
            res.send("code_exists");
        }
    
        //}
        //res.status(200).json(result);
    } catch (error){
      res.status(500).json(error);
    }
}); 

router.get('/towns', async function(req, res){
    //res.render('person.pug');
    //res.send("Hello world");

	////////////////  Get all data
	
	try {
        let result = await Town.find();
        res.status(200).json(result);
    } catch (error){
        res.status(500).json(error);
    }

});

module.exports = router;