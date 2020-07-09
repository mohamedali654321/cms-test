var express = require('express');
const multer=require('multer');
var router = express.Router();
const HomeController=require('../controllers/homeController');

/* GET home page. */
router.all('/*',(req,res,next)=>{
    req.app.locals.layout='default';
   next();
});
router.get('/', HomeController.gethome ) ;
router.get('/singlepost/:id',HomeController.singlepost);
router.post('/comment/:id',HomeController.postcomment);

module.exports = router;
