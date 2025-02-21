const mongoose=require('mongoose');

var propertySchema = mongoose.Schema({
    propertyType: String,    
    transactionType: String,
    stateID: String,
    districtID: String,
    townID: String,
    thumbnailImage: String,
    thumbnailImageName: String,
    locality: String,
    cost : Number,
    costType : String,
    facing : String,
    numberOfFloors : Number,
    builtArea : Number,
    plotArea : Number,
    totalVillas : Number,
    floorNumber : Number,
    bedrooms : Number,
    bedroomsWithToilet : Number,
    toilets : Number,
    carPorch : Boolean,
    carParking : Number,
    sitout : Boolean,
    livingArea : Boolean,
    diningHall : Boolean,
    kitchen : Boolean,
    workArea : Boolean,
    upperLivingArea : Boolean,
    balcony : Boolean,
    openTerrace : Boolean,
    waterWell : Boolean,
    waterConnection : Boolean,
    googleMap : String,
    youtubeVideoLink : String,
    propertyTitle : String,
    propertyFeature1 : String,
    propertyFeature2 : String,
    propertyFeature3 : String,
    propertyFeature4 : String,
    ownerOrBuilderID : String
});

const propertyModel=mongoose.model("property", propertySchema)

module.exports = propertyModel



