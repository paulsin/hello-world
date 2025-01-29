const mongoose=require('mongoose');

var propertySchema = mongoose.Schema({
    propertyType: String,    
    transactionType: String,
    stateID: String,
    districtID: String,
    townID: String,
    thumbnailImage: String
});
const propertyModel=mongoose.model("property",propertySchema)
module.exports =propertyModel



