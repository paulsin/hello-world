const mongoose=require('mongoose');

var historySchema = mongoose.Schema({
    donebyUserId: String,
    donebyUserName: String,          
    dateOperation : Number,
    donebyUserrole : String,
    operation : String
    
 });
 var historymodel = mongoose.model("history", historySchema);
 module.exports = historymodel  