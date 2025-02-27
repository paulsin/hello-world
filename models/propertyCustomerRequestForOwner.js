
const mongoose=require('mongoose');

var propertyCustomerRequestForOwnerSchema = mongoose.Schema({
    propertyID: String,    
    requestTime: String,
    requesterMobile: String,
    requesterName: String,
    requesterMessage: String,
});

const propertyCustomerRequestForOwnerModel = mongoose.model("propertyCustomerRequestForOwner", propertyCustomerRequestForOwnerSchema)
module.exports = propertyCustomerRequestForOwnerModel