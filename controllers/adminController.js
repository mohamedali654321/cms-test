const Post=require('../models/postModel');
const Category=require('../models/categoryModel');
const Comment=require('../models/commentModel');

exports.gethome=(req,res,next)=>{
    res.render('admin/index');
}
exports.getposts=(req,res,next)=>{
    Post.find({}).populate('category').then(posts=>{
        console.log(posts);
           suc2=req.flash('suc2')
           res.render('admin/posts/index',{ Posts : posts,success_message:suc2});
    })
   
    
    
}
exports.getcreatepost=(req,res,next)=>{
    const suc1=req.flash('successf1')
    Category.find({}).then(cats=>{

        res.render('admin/posts/create',{success_message:suc1,categories:cats});
    })
    
}
exports.postcreatepost=(req,res,next)=>{
   const allowComments=req.body.allowComments ? true:false ;
   req.body.image=req.file.filename;
   console.log(allowComments)
   console.log(req.file);
    const newPost=new Post({
        title:req.body.title ,
        status:req.body.status,
        description:req.body.description,
        allowComment:allowComments,
        category:req.body.category,
        image:req.body.image
    });
    newPost.save().then(result=>{
        console.log(result);
        req.flash('successf1','Post Created Successfully');
        res.redirect('/admin/posts/create')

    }).catch(err=>{console.log(err);

    })
    
}
exports.getEditPost=(req,res,next)=>{
    const id=req.params.id;
    Post.findById(id).then(post=>{
        Category.find({}).then(cats=>{
            res.render('admin/posts/edit',{posts:post,categories:cats});

        })
       
    });
}
exports.deletePost=(req,res,next)=>{
    const id=req.params.id;
Post.findByIdAndDelete(id).then(()=>{
     req.flash('suc2','Deleted Successfully')
     res.redirect('/admin/posts')}
   
)
}
exports.getCategory=(req,res,next)=>{
    Category.find({}).then(category=>{
        suc3=req.flash('suc3');
        res.render('admin/category/index',{success_message:suc3,categories:category});

    })
    
}
exports.postCategory=(req,res,next)=>{
const newcategory=new Category({
title:req.body.title

});
newcategory.save().then(category=>{
console.log(category);
req.flash('suc3','Category Created Successfully');
res.redirect('/admin/category');
});
}
exports.postUpdate=(req,res,next)=>{
    const id=req.params.id;
    Post.findById(id).then(post=>{
        post.title=req.body.title ,
        post.description=req.body.description,
        post.status=req.body.status ,
        post.category=req.body.category
        allowComment=req.body.allowComments
        post.save().then(updatedPost=>{
            console.log(updatedPost);
            req.flash('suc2',`Post ${updatedPost.title} Updated Successfully`)
            res.redirect('/admin/posts');
        })

    })

    



}
exports.getComments=(req,res,next)=>{
Comment.find({}).populate('user').then(comments=>{
    res.render('admin/comments/index',{comments:comments});
})

}