
const mongoose=require('mongoose');

var propertyImagesSchema = mongoose.Schema({
    propertyID: String,    
    updateTime: String,
    imageName: String,
    index: Number
});



const propertImagesModel=mongoose.model("propertyImages",propertyImagesSchema)
module.exports =propertImagesModel