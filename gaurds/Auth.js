exports.isAuth=(req,res,next)=>{
    if( req.isAuthenticated())
    {
        res.redirect('/');
        return;
    }
    next();


}
exports.isNotAuth=(req,res,next)=>{
    if(!req.isAuthenticated())
    {
        res.redirect('/users/login');
        return;
    }
    next();
}