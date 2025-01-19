var express = require('express');
var app = express();
//var cors = require('cors');

const fileUpload = require('express-fileupload');
app.use(fileUpload());

var accounts = require('./routes/accounts.js');
var location = require('./routes/location.js');
var property = require('./routes/property.js');

var assetFolder = '/home/paulsin/assets/';

global.databaseURL = 'mongodb://localhost/my_db';

//app.use(cors());


app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
});

console.log(__dirname);
//app.use('/backend/assets', express.static(__dirname + '/assets'));
app.use('/backend/assets', express.static(assetFolder));

app.use('/backend/accounts', accounts);
app.use('/backend/location', location);
app.use('/backend/property', property);

app.post('/backend/addPropertyImages', async function(req, res) {

        try {
            console.log("A new request received from IMages");                        
            //res.status(200).json(result);
    
            console.log(req.files);
            
            const { image } = req.files;

            //console.log(image[0]);
            console.log(image.length);

            //console.log(image[0].name);
            //console.log(image[1].name);

            if (!image) {
                console.log("In not image");
                return res.sendStatus(400);
            }

            if(image.length) {
                for(i=0;i<image.length;i++) {
                    //image[i].mv(__dirname + '/assets/' + image[i].name);
                    image[i].mv(assetFolder + image[i].name);
                }
            }
            else {
                //image.mv(__dirname + '/assets/' + image.name);
                image.mv(assetFolder + image.name);
            }
            
        } catch (error){
          res.status(500).json(error);
        }
    }); 

app.listen(3000);

