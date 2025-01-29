var express = require('express');
var app = express();
var mongoose = require('mongoose');
const path = require('path');
//var cors = require('cors');

const fs = require('fs');

const fileUpload = require('express-fileupload');
app.use(fileUpload());

var accounts = require('./routes/accounts.js');
var location = require('./routes/location.js');
var property = require('./routes/property.js');


// app.use(function(req, res, next) {
//     res.locals.assetFolder = 'D:/mearnpro/assets/';
//     next();
// });

assetFolder="D:/mearnpro/assets/"

global.databaseURL = 'mongodb://localhost/my_db';
const propertImagesModel=require('./models/propertyimages');

//app.use(cors());

// var propertyImagesSchema = mongoose.Schema({
//     propertyID: String,    
//     updateTime: String,
//     imageName: String,
//     index: Number
// });

// var PropertyImages = mongoose.model("PropertyImages", propertyImagesSchema);

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
            let propertyID = req.body.propertyID;
            
            const { image } = req.files;

            // console.log(image[0]);
            console.log(image.length);

            //console.log(image[0].name);
            //console.log(image[1].name);

            if (!image) {
                console.log("In not image");
                return res.sendStatus(400);
            }

            if(image.length) {

                var folderName = propertyID;

                fs.mkdir(path.join(assetFolder, folderName),
                (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    console.log('Directory created successfully!');
                }); 

                for(i=0;i<image.length;i++) {
                    //image[i].mv(__dirname + '/assets/' + image[i].name);
                    //image[i].mv(assetFolder + image[i].name);
                    var imageNameTemp = propertyID + '-' + Date.now() + '-' + i + '.jpg';
                    var tempFolder = assetFolder + folderName + '/';
                    console.log(tempFolder)
                    image[i].mv(tempFolder + imageNameTemp);

                    var newPropertyImages = new propertImagesModel({
                        propertyID: propertyID,    
                        updateTime: Date.now(),
                        imageName: imageNameTemp
                    });
                                                                      
                    newPropertyImages.save().then(()=> {
                        //res.render('show_message.pug', {message: "New person added", type: "success", person: req.body});
                        // res.sendStatus(200);
                    }).catch((err)=> {
                        //res.render('show_message.pug', {message: "Database error", type: "error"});
                        res.sendStatus(401);
                    });
                }
                console.log("rrrrrrrrrr")
                res.sendStatus(200);
            }
            else {
                console.log("htttttttt")
                var folderName = propertyID;

                fs.mkdir(path.join(assetFolder, folderName),
                (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    console.log('Directory created successfully!');
                }); 

                //image.mv(__dirname + '/assets/' + image.name);
                var imageNameTemp = propertyID + '-' + Date.now() + '.jpg';
                console.log(imageNameTemp)
                var tempFolder = assetFolder + folderName + '/';
                console.log(tempFolder)
                image.mv(tempFolder + imageNameTemp);

                var newPropertyImages = new propertImagesModel({
                    propertyID: propertyID,    
                    updateTime: Date.now(),
                    imageName: imageNameTemp
                });
                                                                  
                newPropertyImages.save().then(()=> {
                    //res.render('show_message.pug', {message: "New person added", type: "success", person: req.body});
                    print("haiii")
                    res.sendStatus(200);
                }).catch((err)=> {
                    //res.render('show_message.pug', {message: "Database error", type: "error"});
                    print("jklll")
                    res.sendStatus(401);
                });         
                
                
            }
            
        } catch (error){
          res.status(500).json(error);  
        }
    }); 

app.get('/backend/propertyImages/:propertyID', async function(req, res) {
    console.log(req.params.propertyID);
    try {
        const query = { propertyID: req.params.propertyID };
        let result = await propertImagesModel.find(query);
        res.status(200).json(result);
    } catch (error){
        res.status(500).json(error);
    }

}); 


app.get('/backend/deletePropertyImages/:imageID/:propertyID/:imageName', async function(req, res) {
    console.log(req.params.imageID);
    const filePath = assetFolder + req.params.propertyID + '/' + req.params.imageName;
    console.log(filePath);

    try {
        const query = { _id: req.params.imageID };
        let result = await propertImagesModel.deleteOne(query);

        // Remove the file
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error removing file: ${err}`);
                return;
            }
        
            console.log(`File ${filePath} has been successfully removed.`);
        });

        res.send(result);
    } catch(error) {
        res.status(500).json(error);
    }
}); 

app.listen(3000);

