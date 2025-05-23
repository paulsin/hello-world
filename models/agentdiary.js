const mongoose=require('mongoose');

var agentdiarySchema = mongoose.Schema({
    name: String,
    phone: String,          
    range : String,
    preferedLocation : String,

    
 });
 var agentdiarymodel = mongoose.model("agentdiary", agentdiarySchema);
 module.exports = agentdiarymodel 