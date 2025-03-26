const mongoose=require('mongoose');

var ownerOrBuilderSchema = mongoose.Schema({
    contactNumber: String, 
    secondNumber : String,
    ownerOrBuilder : String,
    name : String,
    address : String,
    ownerStatus:String, 
    ownerAddDate:Number 
});

const ownerOrBuilderModel=mongoose.model("ownerOrBuilder", ownerOrBuilderSchema)

module.exports = ownerOrBuilderModel



