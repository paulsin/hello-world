const mongoose=require('mongoose');

var ownerOrBuilderSchema = mongoose.Schema({
    contactNumber: String, 
    secondNumber : String,
    ownerOrBuilder : String,
    name : String,
    address : String   
});

const ownerOrBuilderModel=mongoose.model("ownerOrBuilder", ownerOrBuilderSchema)

module.exports = ownerOrBuilderModel



