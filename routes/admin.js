const express=require('express');
const adminController=require('../controllers/adminController');
const multer=require('multer');
const Auth=require('../gaurds/Auth');
const router=express.Router();
router.all('/*',(req,res,next)=>{
    req.app.locals.layout='admin';
    
   next();
});
router.get('/',Auth.isNotAuth,adminController.gethome);
router.get('/posts',Auth.isNotAuth,adminController.getposts);
router.get('/posts/create',Auth.isNotAuth,adminController.getcreatepost);
router.post('/posts/create',
multer({
    storage:multer.diskStorage({
        destination:(req,file,done)=>{
            done(null,'files')
        },
        filename:(req,file,done)=>{
            done(null,file.originalname)
        }
    })
}).single('image')
    ,adminController.postcreatepost);
router.get('/posts/edit/:id',Auth.isNotAuth,adminController.getEditPost);
router.get('/posts/delete/:id',Auth.isNotAuth,adminController.deletePost);
router.get('/category',Auth.isNotAuth,adminController.getCategory);
router.post('/category',adminController.postCategory);
router.post('/posts/edit/update/:id',adminController.postUpdate);
router.get('/comment',adminController.getComments);











module.exports=router;