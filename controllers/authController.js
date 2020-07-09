const {validationResult}=require('express-validator');
const User=require('../models/userModel');
const bcrypt=require('bcrypt');



exports.getlogin=(req,res,next)=>{
    const errors=req.flash('loginFlash');
    
    res.render('user/login',{title:'Login',errors:errors,isUser:req.isAuthenticated()})
}
exports.postlogin=(req,res,next)=>{
    const errors=validationResult(req);
    console.log(errors.errors);
    const validationError=[];
    if(!errors.isEmpty()){
        for(var i=0;i<errors.errors.length;i++)
        {
          validationError.push(errors.errors[i].msg);

        }
        console.log(validationError);
        console.log(req.session);
        req.flash('loginFlash',validationError);
        res.redirect('login');
        return;
    }
    

}
exports.getregister=(req,res,next)=>{
    const errors=req.flash('registerFlash');
    res.render('user/register',{title:'Register',errors:errors});
}
exports.postregister=(req,res,next)=>{
    const errors=validationResult(req);
    console.log(errors.errors);
    const validationError=[];
    if(!errors.isEmpty()){
        for(var i=0;i<errors.errors.length;i++)
        {
          validationError.push(errors.errors[i].msg);

        }
        console.log(validationError);
        req.flash('registerFlash',validationError);
        res.redirect('/users/register');
    }
    User.findOne({email:req.body.email}).then(user=>{
        if(user)
        {
            req.flash('registerFlash','This E-mail Already Exist');
            res.redirect('/users/register');

        }
        bcrypt.hash(req.body.password,10).then(hash=>{
            const newUser=new User({
                fristName:req.body.fristname,
                lastName:req.body.lastname,
                email:req.body.email ,
                password:hash
    
            });
            newUser.save().then(user =>{
                console.log(user);
                res.redirect('/users/login');
            })

        })
       



    })
        
    
    

    

   
    
}
exports.logout=(req,res,next)=>{
if(req.isAuthenticated())
{
    req.logOut();
    res.redirect('/')
}
else{
    res.redirect('/users/login');
}

}