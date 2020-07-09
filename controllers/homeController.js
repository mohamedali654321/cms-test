const Post=require('../models/postModel');
const Category=require('../models/categoryModel');
const User=require('../models/userModel');
const Comment=require('../models/commentModel');


exports.gethome=async (req,res,next)=>{
    const posts=await Post.find({});
    const categories=await Category.find({});
   // console.log(categories);
    console.log(posts);
    


    res.render('index', { title: 'CMS App',posts:posts ,categories:categories,isUser:req.isAuthenticated() });
}

exports.singlepost= (req,res,next)=>{
const id=req.params.id;


  Post.findById(id).populate({path: 'comment', populate: {path: 'user', model: 'User'}}).then(posts=>{
    
    
    
      
        Category.find({}).then(categories=>{
            
            console.log(posts.comment);
            res.render('singlepost',{ title: 'post',comment: posts.comment ,posts:posts ,categories:categories ,isUser:req.isAuthenticated() });

        })
       
        
      
    
    
    

  // 

   
    
});

}
exports.postcomment=(req,res,next)=>{
  const postID=req.params.id;
  console.log(postID)
  if(req.user){
     Post.findById(postID).then(posts=>{
       const newComment=new Comment({
         user:req.user._id ,
         body:req.body.comment_body
       });
       posts.comment=(newComment);
       posts.save().then(savedPost=>{
         newComment.save().then(savedComment=>{
           console.log(posts.comment);
           res.redirect(`/singlepost/${posts._id}`);
         })
       })



     })



  }
  else{


    res.redirect('/users/login');
  }

}