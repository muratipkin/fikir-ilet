const mongoose=require("mongoose");

const Schema=mongoose.Schema
const FikirSchema=new Schema({
    tamIsim:String,
    email:String,
    fikirTuru:String,
    fikir:String
});

module.exports=mongoose.model('fikir',FikirSchema);