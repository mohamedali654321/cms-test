var express = require('express');
var router = express.Router();
const AuthController=require('../controllers/authController');
const {check}=require('express-validator');
const passport=require('passport');
const Auth=require('../gaurds/Auth');



/* GET users listing. */
router.all('/*',(req,res,next)=>{
  req.app.locals.layout='default';
  req.isAuthenticated
  
 next();
});
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//login 
router.get('/login',Auth.isAuth,AuthController.getlogin);
router.post('/login',[
  check('email').not().isEmpty().withMessage('Please Enter E-mail'),
  check('email').isEmail().withMessage('Enter valid E-mail'),
  check('password').not().isEmpty().withMessage('Please Enter Password'),
  check('password').isLength({min:5}).withMessage('Password Must Be More Than 6 Charcter')
],passport.authenticate('local-login',{
  session:true ,
  successRedirect:'/admin',
  failureRedirect:'login' ,
  failureFlash:true
  
}),AuthController.postlogin);
//register
router.get('/register',Auth.isAuth,AuthController.getregister);
router.post('/register',[
  check('fristname').not().isEmpty().withMessage('Please Enter Frist Name'),
  check('lastname').not().isEmpty().withMessage('Please Enter Last Name'),
  check('email').not().isEmpty().withMessage('Please Enter E-mail'),
  check('email').isEmail().withMessage('Enter valid E-mail'),
  check('password').not().isEmpty().withMessage('Please Enter Password'),
  check('password').isLength({min:5}).withMessage('Password Must Be More Than 6 Charcter'),
  check('confirm-password').custom((value,{req})=>{
    if(value!==req.body.password){throw new Error('Password And Confirm-Password Not Matching')}
    return true;
  })

],AuthController.postregister);


router.get('/logout',AuthController.logout);



  


module.exports = router;
