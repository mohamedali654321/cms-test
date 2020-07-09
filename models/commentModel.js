const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const commentSchema=Schema({
body:{type:String ,required:true},
date:{type:Date,default:Date.now()},
commentIsapproved:{type:Boolean,default:true},
user:{
    type:Schema.Types.ObjectId,
    ref:'User'
}


});
module.exports=mongoose.model('Comment',commentSchema);