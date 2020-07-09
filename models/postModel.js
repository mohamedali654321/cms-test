const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const postSchema=Schema({
title:{type:String,required:true},
status:{type:String,default:'public'},
description:{type:String,required:true},
creationDate:{type:Date ,default:Date.now()},
allowcomment:{type:Boolean,default:true},
user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
},
category:{
    type:Schema.Types.ObjectId,
    ref:'Category',
    
},
image:{
    type:String ,
    default:' '
},
comment:{
    type:Schema.Types.ObjectId ,
    ref:'Comment'
}

});
module.exports=mongoose.model('Post',postSchema);