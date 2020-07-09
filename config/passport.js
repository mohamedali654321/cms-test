const passport=require('passport');
const User=require('../models/userModel');
const bcrypt=require('bcrypt');
const localStrategy=require('passport-local').Strategy;
passport.serializeUser((user,done)=>{
 done(null,user.id);

});
passport.deserializeUser((id,done)=>{
    User.findById(id,('email'),(err,user)=>{
         done(err,user);
    })
})
passport.use('local-login',new localStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},(req,email,password,done)=>{
    User.findOne({email:email}).then(user=>{
        if(!user)
        {
            return done(null,false,req.flash('loginFlash','This User Not Exist'));
        }
        if(!user.compare(password))
        {
            return done(null,false,req.flash('loginFlash','Wrong Password'));
        }
        return done(null,user);

    })
        


}));